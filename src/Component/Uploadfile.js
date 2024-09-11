import React,{useState} from 'react'
import { Alert,Button } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';
import {v4 as uuidv4} from 'uuid';
import { storage,database } from './Firebase';

function Uploadfile(props) {
    console.log(props.userId)
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);

    const handleChange = async(file)=>{
        setLoading(true);
        if(file==null){
            setError("Please slect a file first");
            setTimeout(()=>{
                setError('')
            },2000)
            return;
        }
        if(file.size/(1024*1024)>100){
            setError("Large Video");

            setTimeout(()=>{
                setError('')
            },2000)
            return;
        }

        let uid=uuidv4();
        const uploadtask= storage.ref(`/posts/${uid}/${file.name}`).put(file);
            uploadtask.on('state_changed',fn1,fn2,fn3);                     //A listener which will call 3 functions if state changed, fn(shows progress), fn2(return error if error occurs), fn3(success uploading file)
            
            function fn1(snapshot){
                let progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                console.log(`Upload is ${progress} done.`);
            }

            function fn2(err){
                setError(err);
                setTimeout(()=>{
                    setError('')
                },2000);
                setLoading(false);
                return;
            }

            function fn3(){
                uploadtask.snapshot.ref.getDownloadURL().then((url)=>{
                    console.log(url);
                    let obj={
                        likes:[],
                        commments:[],
                        pId: uid,
                        pUrl: url,
                        uName: props.user.fullName,
                        uProfile: props.user.profileUrl,
                        userId: props.userId,
                        createdAt:database.getTimeStamp()
                    }

                    database.posts.add(obj).then(async (ref)=>{
                        let res= await database.users.doc(props.userId).update({
                            postIds: props.user.postIds!=null ?[...props.user.postIds,ref.id]:[ref.id]
                        })
                    }).then(()=>{
                        setLoading(false)
                    }).catch((err)=>{
                        setError(err)
                        setTimeout(()=>{
                            setError('')
                        },2000)
                        setLoading(false)
                    })
                })
                setLoading(false);
                
            }
    }
  return (
    <div style={{marginTop:'5rem', marginBottom:'1rem'}} >
        {
            error!==''?<Alert severity="error">{error}</Alert>:
            <>
                <input type="file" accept='video/*' id='upload-input' style={{display:'none'}} onChange={(e)=>{handleChange(e.target.files[0])}} />
                <label htmlFor="upload-input">
                    <Button component="span" variant="outlined" color="secondary" disabled={loading}>       {/*span gets the properties of parent, see docs for more*/}
                        <MovieIcon/>&nbsp;Upload
                    </Button>
                </label>
                {loading && <LinearProgress color="secondary" />}
            </>
        }
    </div>
  )
}

export default Uploadfile
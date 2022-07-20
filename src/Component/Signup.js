import * as React from 'react';
import { useState,useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button,CardActions,Alert,TextField } from '@mui/material';
import './Signup.css'
import insta from '../Assets/Instagram.png'
import { makeStyles } from '@mui/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Link,useNavigate} from 'react-router-dom'
import { Authcontext } from '../Context/Authcontext';
import { database, storage } from './Firebase';

export default function Signup() {
    const useStyles=makeStyles({                    //ued to give styles to Material UI components just like CSS
        text1:{
            color:'grey',
            textAlign:'center'
        },
        card2:{
            marginTop: '2%',
            height: '8vh'
        }
    })

    const [email,setEmail]=useState('');                    //state for email
    const [password,setPassword]=useState('');              //state for passWord
    const [name,setName]=useState('');                      //state for name
    const [file,setFile]=useState(null);                    //state for profile image
    const [error,setError]=useState('');                    //error state in case error is generated
    const [loading,setLoading]=useState(false);                //state for loading
    const navigate = useNavigate();                            //to navigate to feed when success signing up
    const {signup}=useContext(Authcontext);                 //uses signup function from Authcontext, ContextApi

    const classes=useStyles();

    const handleClick=async()=>{
        if(file==null){
            setError("Please Upload Profile Image first");
            setTimeout(()=>{
                setError('')
            },2000)
            return;
        }

        try{
            setError('');
            setLoading(true);
            const userObj= await signup(email,password);
            let uid=userObj.user.uid;
            const uploadtask= storage.ref(`/users/${uid}/ProfileImage`).put(file);
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
                    database.users.doc(uid).set({
                        email:email,
                        userID:uid,
                        fullName:name,
                        profileUrl:url,
                        createdAt:database.getTimeStamp()
                        
                    })
                    setLoading(false);
                    navigate('/');
                })
            }
            console.log(uid);
        }catch(err){
            setError(err);
            setTimeout(()=>{
                setError('')
            },2000);
        }
    }

  return (
    <div className='signupWrapper'>
        <div className='signupCard'>
            <Card variant="outlined">
                
                    <div className="insta-logo">
                        <img src={insta} alt="" className='logo' />
                    </div>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle1">
                            SignUp to see photos ans videos from your friends
                        </Typography>
                        {error!=='' && <Alert severity="error">{error}</Alert>}
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size='small' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size='small' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size='small' value={name} onChange={(e)=>setName(e.target.value)}/>
                        <Button color='secondary' fullWidth={true} variant='outlined' margin='dense' startIcon={<CloudUploadIcon/>} component='label'>
                            Upload Profile Photo
                            <input type="file" accept='image/*' hidden onChange={(e)=>setFile(e.target.files[0])}/>
                        </Button>
                    </CardContent>
                
                <CardActions>
                    <Button size="small" color="primary" variant='contained' fullWidth={true} margin="dense" disabled={loading} onClick={()=>handleClick()}>
                    Sign Up
                    </Button>
                </CardActions>

                <CardContent>
                    <Typography className={classes.text1}>
                        By signing up you agree to our Terms, Data Policy and Cookies Policy
                    </Typography>
                </CardContent>

        </Card>
            
        <Card className={classes.card2}>
            <CardContent>
                <Typography className={classes.text1}>
                    Having an account? <Link to="/login" style={{textDecoration:'none'}}>Login</Link>
                </Typography>
            </CardContent>
        </Card>
        </div>
    </div>
  );
}

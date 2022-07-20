import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import databse, { database } from './Firebase'

function Addcomment({userData,postData,userID}) {
    const [text,setText]=useState('');
    // console.log(userData,postData);

    const handleClick=()=>{
      let obj={
        text:text,
        uProfileImage: userData.profileUrl,
        uName: userData.fullName
      }

      database.comments.add(obj).then((doc)=>{

        let carr=[...postData.commments,doc.id]
        database.posts.doc(postData.postId).update({
          commments:carr
        })
      })

      setText('');
    }

    return (
      <div style={{width:'100%'}}>
          <TextField sx={{width:'70%'}} id="outlined-basic" label="Comment" variant="outlined" size="small" value={text} onChange={(e)=>setText(e.target.value)}/>
          <Button variant="contained" onClick={handleClick}>Post</Button>
      </div>
    )
}

export default Addcomment
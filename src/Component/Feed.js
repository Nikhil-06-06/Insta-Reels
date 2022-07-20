import React,{useContext,useEffect,useState} from 'react'
import { Authcontext } from '../Context/Authcontext'
import Uploadfile from './Uploadfile';
import { database } from './Firebase';
import Posts from './Posts';
import Navbar from './Navbar';

function Feed() {
  const {user,logout}=useContext(Authcontext);
  const [userData,setUserData]=useState('')

  useEffect(()=>{
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
      setUserData(snapshot.data())
    })
    return ()=>{unsub()}
  },[user])

  return (
    <>
    <Navbar userData={userData} userId={user.uid}/>
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
      {/* <div className='comp' style={{width:'50%'}}>
        <h1>Feed</h1>
        <button onClick={logout}>Logout</button>
      </div> */}
      
      <Uploadfile user={userData} userId={user.uid}/>
      <Posts userData={userData} userId={user.uid}/>
    </div>
    </>
  )
}

export default Feed
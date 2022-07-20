import * as React from 'react';
import { useContext,useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button,CardActions,Alert,TextField } from '@mui/material';
import './Login.css'
import insta from '../Assets/Instagram.png'
import { makeStyles } from '@mui/styles';
import {Link} from 'react-router-dom'
import {Authcontext} from '../Context/Authcontext'
import {useNavigate} from 'react-router-dom'

export default function Login() {
    // const store=useContext(Authcontext);
    const useStyles=makeStyles({
        text1:{
            color:'grey',
            textAlign:'center'
        },
        card2:{
            marginTop: '2%',
            height: '8vh'
        },
        text2:{
            textAlign:'center'
        }
    })

    const classes=useStyles();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const [error,setError]=useState('');                    //error state in case error is generated
    const [loading,setLoading]=useState(false);                //state for loading
    const navigate = useNavigate();                            //to navigate to feed when success signing up
    const {login} = useContext(Authcontext);

    let handleClick=async ()=>{
        try{
            setError('');
            setLoading(true);
            await login(email,password);
            setLoading(false);
            navigate('/');
        }catch(err){
            setError(err);
            setTimeout(()=>{
                setError('');
            },2000)
            setLoading(false);
        }
    }

  return (
    <div className='loginWrapper'>
        <div className='loginCard'>
            <Card variant="outlined">
                
                    <div className="insta-logo">
                        <img src={insta} alt="" className='logo' />
                    </div>
                    <CardContent>
                        {error!=='' && <Alert severity="error">{error}</Alert>}
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size='small' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size='small' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        <Typography className={classes.text2} color="primary" variant="subtitle1">
                            Forgot Password?
                        </Typography>
                    </CardContent>
                
                <CardActions>
                    <Button size="small" color="primary" variant='contained' fullWidth={true} margin="dense" onClick={handleClick} disabled={loading}>
                    Log In
                    </Button>
                </CardActions>


        </Card>
            
        <Card className={classes.card2}>
            <CardContent>
                <Typography className={classes.text1}>
                    Don't have an account? <Link to="/signup" style={{textDecoration:'none'}}>Sign Up</Link>
                </Typography>
            </CardContent>
        </Card>
        </div>
    </div>
  );
}

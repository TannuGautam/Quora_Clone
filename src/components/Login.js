import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../css/login.css'

function Login(props) {

    

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState("");

    const { login, currentUser } = useAuth();

    const history = useHistory();

    // const [isAuth,setAuth] = useState(false);

    // useEffect(() =>{
    //     if(props.auth?.uid)
    //     {
    //         history.push('/');
    //     }
    // },[props])

    // const signIn = () => {

    //     auth.signInWithPopup(provider)
    //         .then((result) => {
    //             var credential = result.credential;

    //             var token = credential.accessToken;

    //             var user = result.user;

    //             setAuth(true);

    //             console.log("logged in");
            
    //         }).catch((error) => {
            
    //             var errorCode = error.code;
    //             var errorMessage = error.message;
                
    //             var email = error.email;
                
    //             var credential = error.credential;
                
    //     });
    // }
    // const signIng = async (e) =>{
    //     e.preventDefault();

    //     try{
    //         setError('');
    //         setLoading(true);
    //         await signingoogle();
    //     }
    //     catch{
    //         setError("Failed to create an account");
    //     }
        
    //     setLoading(false);
    // }

    const handleSubmit =  async (e) => {

        e.preventDefault();

        try{
            setError('');
            setLoading(true);
            await login(email,password);

            history.push("/");
        }
        catch{
            setError("Failed to login");
            
        }
        
        setLoading(false);
        setEmail("");
        setPassword("");
        // auth.signInWithEmailAndPassword(email, password)
        // .then((userCredential) => {
        // // Signed in
        // var user = userCredential.user;
        // // ...
        // console.log("logged in");

        //     setAuth(true);
        // })
        // .catch((error) => {
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        // });
    }

    return (
        <div className = "login">
           <form className = "login_container">
                <div className = "login_logo">
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png"
                    alt=""
                    />
                </div>
                {/* <div className = "login_auth">
                    <div className = "login_authoption">
                        <img
                            className="login__googleAuth"
                            src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg"
                            alt=""
                        />
                        <p onClick={signIng}>Continue With Google</p>
                    </div> 
                </div> */}
                <div className = "login_emailPass">
                    
                    <div className="login_label">
                        <h4>Login</h4>
                    </div>
                    
                    <div className = "inputfileds">
                        <div className = "inputfiled">
                            <input type = "text" name = "email" id = "email" value = {email} 
                            onChange = {(e) => {
                                setEmail(e.target.value);
                            }} 
                            autoComplete = "off" placeholder="Email"/>
                        </div>
                        <div className = "inputfiled">
                            {/* <label htmlFor  = "password">Password</label> */}
                            <input type = "password" name = "password" id = "password" 
                            value = {password} 
                            onChange = {(e) => {
                                setPassword(e.target.value);
                            }} 
                            autoComplete = "off" placeholder="Password" />
                        </div>

                        <div className = "buttonP">
                            <button type = "submit" disabled = {loading} className="loginBtn" onClick = {handleSubmit} >Login</button>

                            <button className = "registerbutton">
                                <Link to="/register" >Register</Link>
                            </button>

                            {/* <button className = "forgetButton">
                                <small>
                                    <Link to = "/register">Forget Password?</Link>
                                </small>
                            </button> */}
                        </div>
                    </div>
                </div>
           </form>
        </div>
    )
}

export default Login

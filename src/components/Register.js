import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import {auth , provider} from '../firebase'
import { useAuth, AuthContext } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import "../css/register.css";
import { storage, firestore, database} from "../firebase";


function Register(props) {

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [username,setUsername] = useState("");
    const [file,setFile] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const { register, currentUser } = useAuth();
    
    const history = useHistory();

    function handleFileSubmit(e) {
        let file = e?.target?.files[0];

        if(file != null)
        {
            setFile(e.target.files[0]);
        }
    }

    async function handleSubmit (e){
        e.preventDefault();

        
        try{
            setError('');
            setLoading(true);

            let res = await register(email,password);

            let uid = res.user.uid;

            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);

            uploadTaskListener.on('state_changed', fn1,fn2,fn3);

            function fn1(snapshot)
            {
                var progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            }

            function fn2(error)
            {
                setLoading(false);
                setError(error);
            }

            async function fn3()
            {
                let downloadurl = await uploadTaskListener.snapshot.ref.getDownloadURL();

                database.users.doc(uid).set({
                    email: email,
                    userId: uid,
                    username: username,
                    createdAt: database.getUserTimeStamp(),
                    profileUrl: downloadurl,
                    questions:[]
                })
                setLoading(false);

                props.history.push("/");
            }

            
        }
        catch{
            setError("Failed to login");
            setLoading(false);
        }
    }

    return (
        <div className = "register">
            <div className = "register_container">
                <div className = "register_logo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png"
                    alt=""
                    />
                </div>
                <div className = "register_emailpass">
                    <div className="register_label">
                            <h4>Register</h4>
                    </div>
                    <div className = "inputfileds">
                        

                        {/* <div className = "inputfiled">
                            <input type = "text" name = "fname" id = "fname" value = {fname} 
                                    onChange = {(e) => {
                                        setFname(e.target.value);
                                    }} 
                                    autoComplete = "off" placeholder="First Name"/>
                        </div>
                        <div className = "inputfiled">
                            <input type = "text" name = "lname" id = "lname" value = {lname} 
                                    onChange = {(e) => {
                                        setLname(e.target.value);
                                    }} 
                                    autoComplete = "off" placeholder="Last Name"/>
                        </div> */}
                        <div className = "inputfiled">
                            <input type = "file" accept = "image/*" name = "pimage" id = "pimage"  
                                    onChange = {(e) => {
                                        handleFileSubmit(e);
                                    }} 
                            />
                        </div>
                        <div className = "inputfiled">
                            <input type = "text" name = "username" id = "username" value = {username} 
                                    onChange = {(e) => {
                                        setUsername(e.target.value);
                                    }} 
                                    placeholder="UserName"/>
                        </div>

                        <div className = "inputfiled">
                            <input type = "email" name = "email" id = "email" value = {email} 
                                    onChange = {(e) => {
                                        setEmail(e.target.value);
                                    }} 
                                    autoComplete = "off" placeholder="Email"/>
                        </div>

                        <div className = "inputfiled">
                            <input type = "password" name = "password" id = "password" value = {password} 
                                    onChange = {(e) => {
                                        setPassword(e.target.value);
                                    }} 
                                    autoComplete = "off" placeholder="Password"/>
                        </div>

                        <div className = "buttonR">
                            <button type = "submit" className="registerBtn" onClick = {handleSubmit} disabled = {loading}>Register</button>

                            <button className = "cancelBtn">
                                <Link to="/login" >Cancel</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register

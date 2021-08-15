import React, {useContext, useEffect} from 'react'
import logo from '../images/logo.png'
import HomeIcon from '@material-ui/icons/Home';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import PeopleIcon from '@material-ui/icons/People';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import {Avatar, Button, Input, Link} from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import '../css/navbar.css';
import {auth , provider} from '../firebase';
import { useState } from "react"
import { useAuth, currentUser } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import {database,storage} from '../firebase';
import uuid from 'react-uuid';
import Modal from "react-modal";
import { ExpandMore } from '@material-ui/icons';
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import LinkIcon from "@material-ui/icons/Link";
import firebase from "firebase";
const db = firebase.firestore();


Modal.setAppElement("#root");

function Navbar(props) {

        const [user, setUser] = useState();
        const [loading,setLoading] = useState(false);
        const [openModal, setOpenModal] = useState(false);
        const [input, setInput] = useState("");
        const [inputUrl, setInputUrl] = useState("");
        const [posts,setposts] = useState([]);
        const questionName = input;

       
        const history = useHistory();


    //const [user, setUser] = useState();

    //const [loading,setLoading] = useState(false);
    
    const { logout, currentUser } = useAuth();

    useEffect(async () => {
        console.log(currentUser.uid);
        
        let dataObject = await database.users.doc(currentUser.uid).get();
        // console.log(dataPromise.data());
        setUser(dataObject.data());
        // setLoading(false);
    }, []);
    

    //console.log(user.username);

    const handleQuestion = async (e) =>{

        e.preventDefault();

        setOpenModal(false);

        if (questionName) {
            db.collection("questions").add({
              user: currentUser.uid,
              question: input,
              imageUrl: inputUrl,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
          }

        setInput("");
        setInputUrl("");
    }


     const handleLogout = async(e) =>{

        try{
            // setLoading(true);

            await logout();

            props.history.push('/login');

            // setLoading(false);
        }
        catch(error){
            // setLoading(false);
          };
    }

    

    return (
        <div className = 'navbar'>
            <div className = 'qLogo'>
                <img src = {logo} alt = 'logo' />
            </div>
            <div className = 'qIcons'>
                <div className = 'qIcon'>
                    <HomeIcon />
                </div>
                <div className = 'qIcon'>
                    <FeaturedPlayListIcon />
                </div>
                <div className = 'qIcon'>
                    <AssignmentTurnedInIcon />
                </div>
                <div className = 'qIcon'>
                    <PeopleIcon />
                </div>
                <div className = 'qIcon'>
                    <NotificationsIcon />
                </div>
            </div>
                <div className = 'qsearch'>
                    <SearchIcon />
                    <input type = 'text' placeholder = 'Search Quora..'></input>
                </div>
            
                <div className = 'qremaining'>
                    <div className = 'qavatar'  onClick = {handleLogout}>
                        <Avatar alt="Profile" src = {user?.profileUrl}></Avatar>
                    </div>
                    <LanguageIcon />
                    <Button onClick = { () => setOpenModal(true)}>Add Question</Button>
                    <Modal
                        isOpen = { openModal}
                        onRequestClose = { () => setOpenModal(false)}
                        shouldCloseOnOverlayClick = {false}
                        style = {
                            {
                                overlay: {
                                    width: 700,
                                    height: 600,
                                    backgroundColor: "rgba(0,0,0,0.8)",
                                    zIndex: 1000,
                                    top: "50%",
                                    left: "50%",
                                    marginTop: "-300px",
                                    marginLeft: "-350px",
                                }
                            }
                        }
                    >
                       <div className = " modal_title">
                            <h5>Add Question</h5>
                            <h5>Share Link</h5>
                       </div>
                            <div className = "modal_info">
                            <Avatar alt="Profile" src = {user?.profileUrl}></Avatar>
                                <p>asked</p>
                                <div className = "modal_scope">
                                    <PeopleAltOutlinedIcon />
                                    <p>Public</p>
                                    <ExpandMore />
                                </div>
                            </div>
                            <div className = "modal_field">
                                <Input value = { input } 
                                required
                                onChange = { (e) => setInput(e.target.value)}
                                type = "text" placeholder = "Start Your question with 'What, 'How', 'Why'">
                                </Input>
                            
                            <div className = "modal_fieldLink">
                                <LinkIcon />
                                <input value = { inputUrl }
                                    onChange = { (e) => setInputUrl(e.target.value)}
                                    type = "text"
                                    placeholder = "Optional: include a link that gives context"
                                />
                            </div>
                            </div>
                            <div className = "modal_buttons">
                                <button className = "cancel" onClick = { () => setOpenModal(false)}>Close</button>
                                <button onClick = {handleQuestion} type = "submit" className = "add" >Add Question</button>
                            </div>

                    </Modal>
                </div>
        </div>
    )
}

export default Navbar

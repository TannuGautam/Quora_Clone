import { Avatar } from '@material-ui/core'
import React, { useState, useEffect} from 'react'
import '../css/qbox.css'
import { useAuth } from '../contexts/AuthContext';
import { database, storage } from '../firebase';

function QBox(props) {

    const [user, setUser] = useState();
    const [loading,setLoading] = useState(false);

    const { currentUser } = useAuth();

    useEffect(async () => {
        console.log(currentUser.uid);
       
        let dataObject = await database.users.doc(currentUser.uid).get();

        setUser(dataObject.data());

        setLoading(false);
    }, []);
    

    //console.log(user.username);
    return (
        <div className = 'qbox'>
            <div className = 'qbox_info'>
                <Avatar alt="Remy Sharp" src = {user?.profileUrl}></Avatar>
                <h5>{user?.username}</h5>
            </div>
            <div className = 'qbox_quora'>
                <p>What is your question or link?</p>
            </div>
        </div>
    )
}

export default QBox

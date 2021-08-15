import { Avatar, Button } from '@material-ui/core'
import React from 'react'
import '../css/post.css'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import RepeatIcon from '@material-ui/icons/Repeat';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import { MoreHorizOutlined, ShareOutlined } from '@material-ui/icons';
import post1 from '../images/tcs.png'
import { useAuth } from '../contexts/AuthContext';
import Modal from "react-modal";
import { useState, useEffect} from "react";
import { selectQuestionId, setQuestionInfo } from "../redux/questionSlice";
import firebase from "firebase";
import {database, storage} from '../firebase';
import {db} from '../firebase';
import { useDispatch, useSelector } from "react-redux";

function Post({ Id, question, imageUrl, timestamp, userss }) {

    const dispatch = useDispatch();

    const [IsmodalOpen, setIsModalOpen] = useState(false);
    const questionId = useSelector(selectQuestionId);
    const [answer, setAnswer] = useState("");
    const [getAnswers, setGetAnswers] = useState([]);
    const [user, setUser] = useState();
    const [loading,setLoading] = useState(false);

    const { currentUser } = useAuth();

    useEffect(async () => {
        console.log(currentUser.uid);
        
        let dataObject = await database.users.doc(currentUser.uid).get();
        // console.log(dataPromise.data());
        setUser(dataObject.data());
        // setLoading(false);
    }, []);

    useEffect(() => {
        if (questionId) {
            db.collection("questions")
              .doc(questionId)
              .collection("answer")
              .orderBy("timestamp", "desc")
              .onSnapshot((snapshot) =>
                setGetAnswers(
                  snapshot.docs.map((doc) => ({ id: doc.id, answers: doc.data() }))
                )
              );
          }
    }, [questionId]);

    const handleAnswer = (e) => {
        e.preventDefault();

        if (questionId) {
            db.collection("questions").doc(questionId).collection("answer").add({
              users: user,
              answer: answer,
              questionId: questionId,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
          }
          console.log(questionId);
          setAnswer("");
          setIsModalOpen(false);
    }

    return (
        <div className = 'post'
            onClick = {() =>{
                dispatch(
                    setQuestionInfo({
                        questionId: Id,
                        questionName: question,
                    })
                )
            }}
        
        >
            <div className = 'postInfo'>
                <Avatar 
                    src = {Id.userss?.profileUrl}             
                />
                <h5>{Id.userss?.username}</h5>
                <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
            </div>
            <div className = 'postBody'>
                <div className = 'post_question'>
                    <p>{question}</p>
                    <button className = 'post_btnanswer' onClick={() => setIsModalOpen(true)}>Answer</button>
                    <Modal
                        isOpen = { IsmodalOpen }
                        onRequestClose = { () => setIsModalOpen(false)}
                        shouldCloseOnOverlayClick = {false}
                        style = {
                            {
                                overlay: {
                                    width:680,
                                    height: 550,
                                    backgroundColor: "rgba(0,0,0,0.8)",
                                    zIndex: 1000,
                                    top: "50%",
                                    left: "50%",
                                    marginTop: "-250px",
                                    marginLeft: "-350px",
                                }
                            }
                        }
                    >
                    <div className="modal_question">
                        <h1>{question}</h1>
                        <p>
                            asked by{" "}
                            <span className="name">
                            {Id.userss?.username}
                            </span>{" "}
                            {""}
                            on{" "}
                            <span className="name">
                            {new Date(timestamp?.toDate()).toLocaleString()}
                            </span>
                        </p>
                        </div>
                        <div className="modal_answer">
                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Enter Your Answer"
                            type="text"
                        />
                        </div>
                        <div className="modal_button">
                        <button className="cancle" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </button>
                        <button type="sumbit" onClick={handleAnswer} className="add">
                            Add Answer
                        </button>
                        </div>
                    </Modal>
                </div>
                <div className = 'post_answer'>
                {getAnswers.map(({ id, answers }) => (
                    <p key={id} style={{ position: "relative", paddingBottom: "5px" }}>
                    {Id === answers.questionId ? (
                    <span style = {{display: "flex", justifyContent: "space-between"}}>
                    <div>
                        {answers.answer}
                    </div>    
                    
                    <div>
                        {answers.users?.username}
                        {" "}
                        on{" "}
                        {new Date(answers.timestamp?.toDate()).toLocaleString()}
                    </div>

                    <br />
                    <span
                        style={{
                        position: "absolute",
                        color: "gray",
                        fontSize: "small",
                        display: "flex",
                        right: "0px",
                        }}  
                    >
                    
                      
                    
                  </span>
                </span>
              ) : (
                ""
              )}
            </p>
                ))}
        </div>
                <img src = { imageUrl } alt = ""/>
            </div>
            <div className = "post_footer">
                <div className = 'post_footerActions'>
                    
                    <ArrowUpwardIcon />
                    <ArrowDownwardIcon />
                    
                </div>

                <RepeatIcon />
                <ChatBubbleOutlineOutlinedIcon />

                <div className = 'post_footerLeft'>
                    <ShareOutlined />
                    <MoreHorizOutlined />
                </div>
                
            </div>
        </div>
    )
}

export default Post

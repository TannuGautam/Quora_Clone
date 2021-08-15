import React from 'react'
import "../css/home.css"
import Feed from './Feed'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Widget from './Widget'
import { withRouter } from "react-router";

function Home() {
    return (
        <div className = 'home'>
            <Navbar></Navbar>
            <div className = 'qcontent'>
                <Sidebar></Sidebar>
                <Feed />
                <Widget />
            </div>
        </div>
    )
}

export default Home


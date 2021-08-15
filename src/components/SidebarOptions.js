import React from 'react'
import '../css/sidebaroptions.css'
import history from '../images/history.png'
import bussiness from '../images/bussiness.png'
import psychology from '../images/psychology.png'
import cooking from '../images/cooking.png'
import music from '../images/music.png'
import science from '../images/science.png'
import health from '../images/health.png'
import movies from '../images/movies.png'
import technology from '../images/technology.png'
import education from '../images/education.png'
import { Add } from "@material-ui/icons";

function SidebarOptions() {
    return (
        <div className = "sidebaroptions">
           <div className = "sidebaroption">
                <img src = { history }
                    alt = ""
                />
                <p>History</p>
           </div>
           <div className = "sidebaroption">
                <img src = {bussiness}
                    alt = ""
                />
                <p>Business</p>
           </div>
           <div className = "sidebaroption">
                <img src = {psychology}
                    alt = ""
                />
                <p>Psychology</p>
           </div>
           <div className = "sidebaroption">
                <img src = { cooking }
                    alt = ""
                />
                <p>Cooking</p>
           </div>
           <div className = "sidebaroption">
                <img src = { music }
                    alt = ""
                />
                <p>Music</p>
           </div>
           <div className = "sidebaroption">
                <img src = { science }
                    alt = ""
                />
                <p>Science</p>
           </div>
           <div className = "sidebaroption">
                <img src = { health }
                    alt = ""
                />
                <p>Health</p>
           </div>
           <div className = "sidebaroption">
                <img src = { movies }
                    alt = ""
                />
                <p>Movies</p>
           </div>
           <div className = "sidebaroption">
                <img src = { technology }
                    alt = ""
                />
                <p>Technology</p>
           </div>
           <div className = "sidebaroption">
                <img src = { education }
                    alt = ""
                />
                <p>Education</p>
           </div>
           <div className = "sidebaroption">
                <Add />
                <p className="text">Discover Spaces</p>
           </div>
        </div>
    )
}

export default SidebarOptions

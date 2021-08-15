import React from 'react';
import '../css/widgetoptions.css'
import mphoto from '../images/mobile.png';
import quote from '../images/quote.png';
import man from '../images/man.png';
import fredrick from '../images/fredrick.png';
import bull from '../images/bull.png';
import earth from '../images/earth.png';

function Widgetoptions() {
    return (
        <div className = 'widgetoptions'>
            <div className = 'widgetoption'>
                <img src = {mphoto} alt =  "/" />
                <div className = 'widgetoption_title'>
                    <h5>Mobile App Programmer</h5>
                    <p>The best Mobile App Develpoment Company</p>
                </div>
            </div>
            <div className = 'widgetoption'>
                <img src = {quote} alt =  "/" />
                <div className = 'widgetoption_title'>
                    <h5>Quota of Quotes</h5>
                    <p>Daily dosage of unforgettable lines from ...</p>
                </div>
            </div>
            <div className = 'widgetoption'>
                <img src = {man} alt =  "/" />
                <div className = 'widgetoption_title'>
                    <h5>Art & Artist</h5>
                    <p>A Space retated to creating, practicing an...</p>
                </div>
            </div>
            <div className = 'widgetoption'>
                <img src = {fredrick} alt =  "/" />
                <div className = 'widgetoption_title'>
                    <h5>Friedrich Nietzche</h5>
                    <p>A Space dedicated to great work of Friedrich...</p>
                </div>
            </div>
            <div className = 'widgetoption'>
                <img src = {bull} alt =  "/" />
                <div className = 'widgetoption_title'>
                    <h5>Stock Market Strategies</h5>
                    <p>Everything about investing in Stock...</p>
                </div>
            </div>    
            <div className = 'widgetoption'>
                <img src = {earth} alt =  "/" />
                <div className = 'widgetoption_title'>
                    <h5>Architecture World</h5>
                    <p>All about civil architecture...</p>
                </div>
            </div>
        </div>
    )
}

export default Widgetoptions

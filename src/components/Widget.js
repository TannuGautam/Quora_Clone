import React from 'react'
import '../css/widget.css'
import Widgetoptions from './Widgetoptions'

function Widget() {
    return (
        <div className = 'widget'>
            <div className = 'widget_header'>
                <h5>Spaces to follow</h5>
            </div>
            <div className = 'widget_contents'>
                <Widgetoptions />
            </div>
        </div>
    )
}

export default Widget

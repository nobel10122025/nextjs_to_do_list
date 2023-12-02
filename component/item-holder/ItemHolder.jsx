"use client"
import { useState } from 'react';

import './style.css'

const sampleArray = [
    {
        name: "Jog for 10 mins",
        isCompleted: true
    },
    {
        name: "Complete fronend mentor",
        isCompleted: true
    },
    {
        name: "take a nap",
        isCompleted: false
    },
    {
        name: "Read for a 1 hour",
        isCompleted: true
    },
    {
        name: "Complete DS one per day",
        isCompleted: false
    }
]

function ItemHolder() {
    const [item, setItem] = useState(sampleArray)
    return (
        <div className="root">
            <div className="imageContainer">
                <img src="bg-desktop-light.jpg" alt='background-image' className="image" />
                <div className="banner">
                    <div className="header">
                        <span className="heading">TODO</span>
                        <img src="icons/icon-sun.svg" />
                    </div>
                    <input className="input" value="" onChange={(event) => { }} />
                </div>
                <div className="itemContainer">
                    {item && item.map((currentItem) => {
                        const { name, isCompleted } = currentItem
                        return (
                            <div className="itemHolder">
                                {isCompleted ? <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/></svg>
                                </div> : <div className="uncheckIcon"></div>}
                                <span className={"name"}>{name}</span>
                            </div>
                        )
                    })}
                    <div className='controls'>
                        <span className='count'>{item.length} items left</span>
                        <div className='tabContainer'>
                            <span className='tabValue tabActive'>All</span>
                            <span className='tabValue'>Active</span>
                            <span className='tabValue'>Completed</span>
                        </div>
                        <span className='clearLink'>Clear Completed</span>
                    </div>
                </div>
            </div>
            <span className='subText'>Drag and Drop to reorder the list</span>
        </div>
    )
}

export default ItemHolder
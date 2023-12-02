"use client"
import { useEffect, useState } from 'react';

//Components
import MenuBar from '@component/menu-bar/MenuBar';
import FallbackScreen from '@component/fall-back-screen/fallbackScreen';

// google auth
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

//Styles
import './style.css'

const sampleArray = [
    {
        name: "Jog for 10 mins",
        isCompleted: true,
        id: 1,
    },
    {
        name: "Complete fronend mentor",
        isCompleted: true,
        id: 2,
    },
    {
        name: "take a nap",
        isCompleted: false,
        id: 3,
    },
    {
        name: "Read for a 1 hour",
        isCompleted: true,
        id: 4,
    },
    {
        name: "Complete DS one per day",
        isCompleted: false,
        id: 5,
    }
]

function ItemHolder() {
    const {data: session} = useSession()
    const [item, setItem] = useState(sampleArray)
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [providers, setProviders] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await getProviders()
            setProviders(response)
        })()
    }, [])

    return (
        <div className="root">
            <div className="imageContainer">
                <img src="bg-desktop-light.jpg" alt='background-image' className="image" />
                {session?.user ? <>
                    <MenuBar />
                    <div className="banner">
                        <div className="header">
                            <span className="heading">TODO</span>
                            <img src="icons/icon-sun.svg" />
                        </div>
                        <input className="input" value="" onChange={(event) => { }} />
                    </div>
                    <div className="itemContainer">
                        {item && item.map((currentItem) => {
                            const { name, isCompleted, id } = currentItem
                            return (
                                <div className="itemHolder" key={id}>
                                    {isCompleted ? <div className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6" /></svg>
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
                </> : providers && Object.keys(providers) && <FallbackScreen providers={providers} />}
            </div>
            <span className='subText'>Drag and Drop to reorder the list</span>
        </div>
    )
}
export default ItemHolder
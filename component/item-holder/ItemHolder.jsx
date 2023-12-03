"use client"
import { useEffect, useState } from 'react';

//Components
import MenuBar from '@component/menu-bar/MenuBar';
import FallbackScreen from '@component/fall-back-screen/fallbackScreen';

// google auth
import { useSession, getProviders } from "next-auth/react"

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
const ACTIVE = "Active"
const COMPLETED = "Completed"
const ALL = "All"

function ItemHolder() {
    const { data: session } = useSession()
    const [items, setItems] = useState(sampleArray)
    const [filteredItems, setFilteredItems] = useState(sampleArray)
    const [enteredData, setEntered] = useState('')
    const [providers, setProviders] = useState(null)

    console.log("session", session)

    useEffect(() => {
        (async () => {
            const response = await getProviders()
            setProviders(response)
        })()
    }, [])

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('api/task')
            console.log("response", response)
            const data = response.json()
            setItems(data)
        }
        if (session?.user.name) fetchItems()
    }, [session?.user.id])

    const addItem = () => {
        let myNewTask = {}
        if (enteredData === "") alert("please enter the task")
        else {
            myNewTask = {
                id: new Date().getTime().toString(),
                name: enteredData,
                isCompleted: false
            }
            setItems([...items, myNewTask])
            setFilteredItems([...items, myNewTask])
            saveCreatedItem(myNewTask)
        }
    }

    const saveCreatedItem = async (myNewTask) => {
        const response = await fetch('api/task/create', { ...myNewTask, userId: session?.user.id })
        console.log("responseresponse", response)
    }

    const clearCompletedItems = () => {
        const updatedItems = items.filter((currentItem) => !currentItem.isCompleted)
        setItems(updatedItems)
        setFilteredItems(updatedItems)
    }

    const onTabSwitch = (tabName) => {
        let updatedItems = [];
        if (tabName === "Active") {
            updatedItems = items.filter((currentItem) => !currentItem.isCompleted)
        } else if (tabName === "Completed") {
            updatedItems = items.filter((currentItem) => currentItem.isCompleted)
        } else {
            updatedItems = items
        }
        setFilteredItems(updatedItems)
    }

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
                        <input
                            className="input"
                            value={enteredData}
                            onChange={(event) => setEntered(event.target.value)}
                            onKeyDown={(event) => event.key === "Enter" && addItem()}
                        />
                    </div>
                    <div className="itemContainer">
                        {filteredItems && filteredItems.map((currentItem) => {
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
                            <span className='count'>{items.length} items left</span>
                            <div className='tabContainer'>
                                <span className='tabValue tabActive' onClick={() => onTabSwitch(ALL)}>{ALL}</span>
                                <span className='tabValue' onClick={() => onTabSwitch(ACTIVE)}>{ACTIVE}</span>
                                <span className='tabValue' onClick={() => onTabSwitch(COMPLETED)}>{COMPLETED}</span>
                            </div>
                            <span className='clearLink' onClick={clearCompletedItems}>Clear Completed</span>
                        </div>
                    </div>
                </> : providers && Object.keys(providers) && <FallbackScreen providers={providers} />}
            </div>
            <span className='subText'>Drag and Drop to reorder the list</span>
        </div>
    )
}
export default ItemHolder
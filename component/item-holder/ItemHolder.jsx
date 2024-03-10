"use client"
import { useEffect, useState } from 'react';
import { updatedCurrentItem, createItems, deleteItem, getSavedItems, deleteCompletedItems, isLightTheme } from '@component/apis/apis';
import { MediaContextProvider, Media } from "@utils/media.js"

//Components
import MenuBar from '@component/menu-bar/MenuBar';
import FallbackScreen from '@component/fall-back-screen/fallbackScreen';

// google auth
import { useSession, getProviders } from "next-auth/react"

//Styles
import './style.css'
import { deserializeList, deserializeListItem, getCurrentItemList } from './util';

const ACTIVE = "Active"
const COMPLETED = "Completed"
const ALL = "All"

function ItemHolder() {
    const { data: session } = useSession()
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [enteredData, setEntered] = useState('')
    const [providers, setProviders] = useState(null)
    const [activeTab, setActiveTab] = useState(ALL)
    const [itemId, setItemId] = useState(null)
    const [isLightMode, setIsLightMode] = useState(false)

    useEffect(() => {
        (async () => {
            const response = await getProviders()
            setProviders(response)
        })()
    }, [])

    useEffect(() => {
        const fetchItems = async () => {
            const res = await getSavedItems(session?.user.id)
            const data = await res.json()
            const dataToSet = deserializeList(data)
            setFilteredItems(dataToSet)
            setItems(dataToSet)
        }
        if (session?.user.name) fetchItems()
    }, [session?.user.name])

    const addItem = async () => {
        let new_task = {}
        if (enteredData === "") alert("please enter the task")
        else if (itemId) {
            updateItem(enteredData, itemId)
        } else {
            new_task = {
                name: enteredData,
                isCompleted: false
            }
            const payload = { ...new_task, userId: session?.user.id }
            const updatedTask = await createItems(payload)
            const updatedTaskJson = await updatedTask.json()
            const deserializeJSON = deserializeListItem(updatedTaskJson)
            setItems([...items, deserializeJSON])
            setFilteredItems([...items, deserializeJSON])
            setEntered('')
        }
    }

    const markAtDoneUndone = async (taskId, isCompleted) => {
        const updatedTask = await updatedCurrentItem(taskId, { isCompleted: !isCompleted })
        let updatedTaskJson = await updatedTask.json()
        const updatedList = getCurrentItemList(updatedTaskJson, items)
        setItems(updatedList)
        setFilteredItems(updatedList)
    }

    const updateItem = async (taskName, taskID) => {
        const updatedTask = await updatedCurrentItem(taskID, { task_name: taskName })
        const updatedTaskJson = await updatedTask.json()
        const updatedList = getCurrentItemList(updatedTaskJson, items)
        setItems(updatedList)
        setFilteredItems(updatedList)
        setEntered('')
        setItemId(null)
    }

    const removeItem = async (taskId) => {
        await deleteItem(taskId)
        const updatedList = items.filter((currentItem) => currentItem.id !== taskId)
        setItems(updatedList)
        setFilteredItems(updatedList)

    }

    const clearCompletedItems = () => {
        const idsToDelete = items.reduce((reqArray, currentItem) => {
            if (currentItem.isCompleted) reqArray.push(currentItem.id)
            return reqArray
        }, [])
        deleteCompletedItems({ ids: idsToDelete })
        const updatedItems = items.filter((currentItem) => !currentItem.isCompleted)
        setItems(updatedItems)
        setFilteredItems(updatedItems)
    }

    const onTabSwitch = (tabName) => {
        let updatedItems = [];
        if (tabName === ACTIVE) {
            updatedItems = items.filter((currentItem) => !currentItem.isCompleted)
        } else if (tabName === COMPLETED) {
            updatedItems = items.filter((currentItem) => currentItem.isCompleted)
        } else {
            updatedItems = items
        }
        setActiveTab(tabName)
        setFilteredItems(updatedItems)
    }

    return (
        <MediaContextProvider>
            <div className={`root ${!isLightMode && 'dark'}`}>
                <div className="imageContainer" style={{ background: isLightMode ? 'url("bg-desktop-light.jpg")' : 'url("bg-desktop-dark.jpg")' }}>
                    {/* <img src="bg-desktop-light.jpg" alt='background-image' className="image" /> */}
                    {session?.user ? <>
                        <MenuBar />
                        <div className="banner">
                            <div className="header">
                                <span className="heading">TODO</span>
                                <img
                                    src={isLightMode ? "icons/icon-moon.svg" : "icons/icon-sun.svg"}
                                    onClick={() => {
                                        isLightTheme(session?.user.id, { is_light_mode: !isLightMode });
                                        setIsLightMode(!isLightMode)
                                    }} />
                            </div>
                            <input
                                className={`input ${!isLightMode && 'dark'}`}
                                value={enteredData}
                                onChange={(event) => setEntered(event.target.value)}
                                onKeyDown={(event) => event.key === "Enter" && addItem()}
                            />
                        </div>
                        <div className="itemContainer">
                            {items && items.length === 0 && <FallbackScreen providers={providers} title={"Opps! please add a task to be done..."} showButton={false} />}
                            {filteredItems && filteredItems.map((currentItem) => {
                                const { name, isCompleted, id } = currentItem
                                return (
                                    <div className={`itemHolder ${!isLightMode && 'dark'}`} key={id}>
                                        <div className="itemNames">
                                            {isCompleted ? <div className="icon" onClick={() => markAtDoneUndone(id, isCompleted)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6" /></svg>
                                            </div> : <div className="uncheckIcon" onClick={() => markAtDoneUndone(id, isCompleted)}></div>}
                                            <span className={"name"}>{name}</span>
                                        </div>
                                        <div className='itemEdits'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" onClick={() => { setEntered(name); setItemId(id) }}>
                                                <path fill='#d3d3d3' d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512" onClick={() => removeItem(id)}>
                                                <path fill='#d3d3d3' d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                            </svg>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className={`itemHolder ${!isLightMode && 'dark'}`}>
                                <Media at="sm"><span className={`count ${!isLightMode && 'dark'}`}>{items.length} items left</span></Media>
                                <Media at="sm"><span className={`clearLink ${!isLightMode && 'dark'}`} onClick={clearCompletedItems}>Clear Completed</span></Media>
                            </div>
                            {items && items.length !== 0 && <div className={`controls ${!isLightMode && 'dark'}`}>
                                <Media greaterThan="sm">
                                    <span className={`count ${!isLightMode && 'dark'}`}>{items.length} items left</span>
                                </Media>
                                <div className='tabContainer'>
                                    <span className={`tabValue ${activeTab === ALL && "tabActive"} ${!isLightMode && 'dark'}`} onClick={() => onTabSwitch(ALL)}>{ALL}</span>
                                    <span className={`tabValue ${activeTab === ACTIVE && "tabActive"} ${!isLightMode && 'dark'}`} onClick={() => onTabSwitch(ACTIVE)}>{ACTIVE}</span>
                                    <span className={`tabValue ${activeTab === COMPLETED && "tabActive"} ${!isLightMode && 'dark'}`} onClick={() => onTabSwitch(COMPLETED)}>{COMPLETED}</span>
                                </div>
                                <Media greaterThan="sm">
                                    <span className={`clearLink ${!isLightMode && 'dark'}`} onClick={clearCompletedItems}>Clear Completed</span>
                                </Media>
                            </div>}
                        </div>
                    </> : providers && Object.keys(providers) && <FallbackScreen providers={providers} title={"Please sign in to save your checklist"} showButton={true} />}
                </div>
                {session?.user && <span className={`subText ${!isLightMode && 'dark'}`}>Drag and Drop to reorder the list</span>}
            </div>
        </MediaContextProvider>
    )
}
export default ItemHolder
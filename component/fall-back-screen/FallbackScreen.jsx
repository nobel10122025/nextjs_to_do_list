"use client"

import './style.css'

function FallbackScreen() {
    return (
        <div className='fallback-container'>
            <div className='fallback-root'>
                <img src='fallback-image.png' alt='fallback-image' className='fallback-image' />
                <div className='fallback-title'>Please sign in to save your checklist</div>
                <button className='sign-in-button'>Sign in with Google</button>
            </div>
        </div>
    )
}

export default FallbackScreen
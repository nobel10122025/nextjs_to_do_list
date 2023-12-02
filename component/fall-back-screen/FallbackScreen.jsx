"use client"
import { signIn } from 'next-auth/react'
import './style.css'

function FallbackScreen({ providers }) {
    console.log("this is here", providers, Object.values(providers))
    return (
        <div className='fallback-container'>
            <div className='fallback-root'>
                <img src='fallback-image.png' alt='fallback-image' className='fallback-image' />
                <div className='fallback-title'>Please sign in to save your checklist</div>
                {providers && Object.values(providers).map((currentProvider) => (
                    <button
                        className='sign-in-button'
                        key={currentProvider.name}
                        onClick={() => signIn(currentProvider.id)}
                    >
                        Sign in with Google
                    </button>
                ))}
            </div>
        </div>
    )
}

export default FallbackScreen
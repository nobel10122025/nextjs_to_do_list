"use client"
import { signIn } from 'next-auth/react'
import './style.css'

function FallbackScreen({ providers, title, showButton }) {
    return (
        <div className='fallback-container'>
            <div className={`fallback-root ${!isLightMode && 'dark'}`}>
                <img src='fallback-image.png' alt='fallback-image' className='fallback-image' />
                <div className={`fallback-title ${!isLightMode && 'dark'}`}>{title}</div>
                {providers && Object.values(providers).map((currentProvider) => (
                    showButton && <button
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
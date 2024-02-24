import '@/globalStyles.css'

import Provider from '@component/Provider/Provider'

import { Open_Sans } from "next/font/google"

export const metadata = {
    title: 'To do list',
    description: 'a simple todo list app'
}

const openSan = Open_Sans({
    subsets: ['latin'],
    weight: ['400', '700']
})

function Rootlayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <Provider>
                    <main className={openSan.className}>
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default Rootlayout
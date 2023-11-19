import '@/globalStyles.css'

import { Open_Sans } from "@next/font/google"
export const metadata = {
    title: 'To do list',
    description: 'a simple todo list app'
}

const openSan = Open_Sans({
    subsets: ['latin'],
    weight: ['400' , '700']
})

function Rootlayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <main className={openSan.className}>
                    {children}
                </main>
            </body>
        </html>
    )
}

export default Rootlayout
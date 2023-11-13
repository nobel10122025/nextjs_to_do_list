import '@/globalStyles.css'

export const metadata = {
    title: 'To do list',
    description: 'a simple todo list app'
}

function Rootlayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <div className='main'>
                    <div className='gradient' />
                </div>
                <main className='app'>
                    {children}
                </main>
            </body>
        </html>
    )
}

export default Rootlayout
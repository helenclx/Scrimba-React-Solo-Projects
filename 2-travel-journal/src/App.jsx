import './App.css'
import Header from './components/Header'
import Entry from './components/Entry'
import travelData from './traveldata'

function App() {
    const entries = travelData.map(entry => {
        return (
            <Entry
                key={entry.id}
                {...entry}
            />
        )
    })

    return (
        <div className='page-wrapper'>
            <Header />
            <main>
                {entries}
            </main>
        </div>
    )
}

export default App

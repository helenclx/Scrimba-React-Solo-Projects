import './App.css'

import Info from './components/Info'
import About from './components/About'
import Interests from './components/Interests'
import Footer from './components/Footer'

function App() {
    return (
        <main>
            <div className="card">
                <Info />
                <About />
                <Interests />
                <Footer />
            </div>
        </main>
    )
}

export default App

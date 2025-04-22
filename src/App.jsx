import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomePage from './pages/WelcomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <WelcomePage/>
    </>
  )
}

export default App

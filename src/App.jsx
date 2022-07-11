import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import SearchBar from './components/SearchBar'
import backGround from "./components/background.gif"
import bg from './components/BackGroungTwo.jpg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='total'>
      <img src={bg} alt="" />
      <SearchBar/>
    </div>
  )
}

export default App

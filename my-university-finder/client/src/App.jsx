import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FilterForm from './components/FilterForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Japan University Finder</h1>
        <FilterForm/>
      </div>
    </>
  )
}

export default App

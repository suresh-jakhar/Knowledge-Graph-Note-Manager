import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { PlusIcon } from './icons/PlusIcon'
import './App.css'
import { Button } from './components/ui/Button'

function App() {
  const [count, setCount] = useState(0)

  return(
    <>
    <Button size="small"  variant = "primary" text = "Add" startIcon={<PlusIcon />}/>
    <Button size="small"  variant = "primary" text = "Add" startIcon={<PlusIcon />}/>
    <Button size="small"  variant = "primary" text = "Add" startIcon={<PlusIcon />}/>

    </>
  )
}

export default App

import { useState } from 'react'
import { PlusIcon } from './icons/PlusIcon'
import './App.css'
import { Button } from './components/ui/Button'

function App() {
  const [count, setCount] = useState(0)

  return(
    <>
    <Button size="small"  variant = "primary" text = "Add" startIcon={<PlusIcon size="large" />}/>
    <Button size="medium"  variant = "primary" text = "Add" startIcon={<PlusIcon />}/>
    <Button size="large"  variant = "primary" text = "Add" startIcon={<PlusIcon />}/>

    </>
  )
}

export default App

import { useState } from 'react'


function App() {
  const [text,setText] = useState('Haz click aqui');

  const handleClick = () => {
    setText("Gracias por hacer click!")
  }
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

export default App

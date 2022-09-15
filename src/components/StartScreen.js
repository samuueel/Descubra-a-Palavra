import React from 'react'
import "./StartScreen.css"

const StartScreen = ({ startGame }) => {
  return (
    <div>
        <h1>Descubra a Palavra!</h1>
        <p>Clique no botão</p>
        <button onClick={startGame}>COMEÇAR JOGO</button>
    </div>
  )
}

export default StartScreen
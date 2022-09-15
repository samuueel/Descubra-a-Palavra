import React from 'react'
import "./GameOver.css"

const GameOver = ({ retry, score }) => {
  return (
    <div>
        <h1>GameOver</h1>
        <span>a sua pontuação foi: <span>{score}</span></span>
        <button onClick={retry}>RESETAR JOGO</button>
    </div>
  )
}

export default GameOver
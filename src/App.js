// CSS
import './App.css';
// HOOKS
import { useCallback, useState, useEffect } from 'react';
// COMPONENTS
import StartScreen from './components/StartScreen';
import {wordsList} from './data/words';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
]

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0)


  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {word, category}
  }, [words])


  const startGame = useCallback(() => {
    clearLetterStates()

    const {word, category} = pickWordAndCategory();

    let wordLetters = word.split("");

    setGameStage(stages[1].name)

    setPickedWord(word) 
    setPickedCategory(category) 
    setLetters(wordLetters)
  }, [pickWordAndCategory])

  const verifyLetter = (letter) => {
    const normalizeLetter = letter.toLowerCase();
    if (guessedLetters.includes(normalizeLetter)|| wrongLetters.includes(normalizeLetter)) {
      return;
    }
    if (letters.includes(normalizeLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizeLetter
      ])  
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizeLetter
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
    if(guesses <=0) {
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses])

  useEffect(() => {

    const uniqueLetters = [...new Set(letters)];

    if(guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => actualScore += 100)
      startGame();
    }

  }, [guessedLetters, letters, startGame])

  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);

    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && 
        <Game 
          verifyLetter={verifyLetter} 
          pickedWord={pickedWord} 
          pickedCategory={pickedCategory} 
          letters={letters}
          guessedLetters={guessedLetters} 
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />}
      {gameStage === "end" && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;

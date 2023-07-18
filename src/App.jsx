import React from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import fireworks from './assets/audios/firework.mp3'

const App = () => {
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [animation, setAnimation] = React.useState(false)
    const partySound = new Audio(fireworks)
    const [isPlaying, setIsPlaying] = React.useState(false)

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? {
                ...die, isHeld: !die.isHeld
            } : die
        }))
    }

    function generateNewDie() {
        return {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
        }
    }
    function allNewDice() {
        const randomNumbers = []

        for (let i = 0; i < 10; i++) {
            randomNumbers.push(generateNewDie())
        }
        return randomNumbers
    }

    function rollDice(){
        setAnimation(true);

        setTimeout(() => {
            setAnimation(false)

        }, 4050)
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }))
        }
        else{
            setTenzies(false)
            setIsPlaying(false)
            setDice(allNewDice())
        }
    }

    React.useEffect(() => {
        if (isPlaying) {
            partySound.play()
        }
        else{
            partySound.pause()
        }
    }, [isPlaying])

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSame = dice.every(die => die.value === firstValue)

        if (allHeld && allSame) {
            setTenzies(true)
            setIsPlaying(true)
        }

    }, [dice])

    return (
        <main className="main-container">
            {
                tenzies && <Confetti  />
            }
            <h1 className="title">
                Tenzies
            </h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>
            <section className='dice-container'>
                {
                    dice.map(die =>
                    <Die
                        key={die.id}
                        value={die.value}
                        isHeld={die.isHeld}
                        animate={animation}
                        holdDice={
                            () => holdDice(die.id)
                        }
                    />)
                }
            </section>
            <button
                className={tenzies ?
                    "roll-button reset" : "roll-button"
                }
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}

export default App

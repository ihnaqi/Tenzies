import diceRoll from '../assets/audios/spinning.mp3'

const Die = (props) => {

    const audio = new Audio(diceRoll);

    if (props.animate && !props.isHeld) {
        audio.play()
    }

    setTimeout(() => {
        audio.pause()
    }, 4000)

    return (
        <section className={`dice face${props.value} ${props.animate && !props.isHeld && 'animate'}`}>
            <span onClick={props.holdDice} className={`face front face1 ${props.isHeld && 'held'}`}></span>
            <span onClick={props.holdDice} className={`face back face2 ${props.isHeld && 'held'}`}></span>
            <span onClick={props.holdDice} className={`face top face3 ${props.isHeld && 'held'}`}></span>
            <span onClick={props.holdDice} className={`face bottom face4 ${props.isHeld && 'held'}`}></span>
            <span onClick={props.holdDice} className={`face right face5 ${props.isHeld && 'held'}`}></span>
            <span onClick={props.holdDice} className={`face left face5 ${props.isHeld && 'held'}`}></span>
        </section>
    );
}

export default Die
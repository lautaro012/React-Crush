import './Finalmessage.css'

export default function Finalmessage ({handleRefresh, score, moves}) {


    return (
        <div className="finalmessage">
            <h2> Time's up.. Great job! </h2>
            <h2>Your score is {score} in {moves} moves </h2>
            <h2>THANK YOU FOR PLAYING!!</h2>
            <>
            <button onClick={handleRefresh}> Play Again </button>
            </>
        </div>
    )
}
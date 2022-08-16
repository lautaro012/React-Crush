import './About.css'

export default function About ({setShowAbout}) {

    return (
        <div className='aboutmessage'>
            <button onClick={setShowAbout}> X </button>
            <text> Hi! My name is Lautaro and im a Fullstack Web Developer... 
                    This website is made only whit React components and Javascript logic, please enjoy and if you like 
                        please look my other jobs in my github. Thank you !
            </text>
            <span> https://github.com/lautaro012 </span>
            <span> https://www.linkedin.com/in/lautaro-robles-57a5ba242/ </span>
        </div>
    )
}

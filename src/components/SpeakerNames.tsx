import { useEffect, useState } from 'react' 

interface Speaker {
    id: number,
    name: string,
    role: string,
    here: boolean
}
const shuffleArray = array => array.sort(() => 0.5 - Math.random());

const SpeakerNames = ({speakers, questions, showIceBreakers, quotes}) => {
    
    const timeoutDelay = 1000
    const [currentSpeaker, setCurrentSpeaker] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(questions[Math.floor(Math.random() * questions.length)].question)
    const [quote, setQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)])
    const [speakersRoll, setSpeakersRoll] = useState([])
    const [imsArray, setImsArray] = useState([])
    const [devsArray, setDevsArray] = useState([])
    const [devLeadArray, setDevLeadArray] = useState([])
    const [imLeadArray, setImLeadArray] = useState([])
    const [hideName, setHideName] = useState<Boolean>(false)
    const [finished, setFinished] = useState<Boolean>(false)

    const previousSpeaker = () => {
        setHideName(true)
        currentSpeaker > 0 ? setTimeout(()=>{setCurrentSpeaker(currentSpeaker - 1)}, timeoutDelay) : null
        currentSpeaker > 0 ? setTimeout(()=>{setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)].question)}, timeoutDelay) : null
    }

    const nextSpeaker = () => {
        setHideName(true)
        currentSpeaker < speakersRoll.length - 1 ? setTimeout(()=>{setCurrentSpeaker(currentSpeaker + 1)}, timeoutDelay) : null
        currentSpeaker < speakersRoll.length - 1 ? setTimeout(()=>{setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)].question)}, timeoutDelay) : null
    }

    const changeIceBreaker = () => {
        setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)].question)
    }

    const buildSpeakersList = () => {
        return [...imLeadArray, ...imsArray, ...devsArray, ...devLeadArray]
    }

    useEffect(() => {
        setImsArray(shuffleArray(speakers.filter( s => s.role === 'im' && s.here )))
        setDevsArray(shuffleArray(speakers.filter( s => s.role === 'dev' && s.here )))
        setDevLeadArray(shuffleArray(speakers.filter( s => s.role === 'devlead' && s.here )))
        setImLeadArray(shuffleArray(speakers.filter( s => s.role === 'imlead' && s.here )))
        
    }, [])

    useEffect(()=>{
        setSpeakersRoll(buildSpeakersList())    
    }, [imsArray, devsArray, imLeadArray, devLeadArray])

    useEffect(() => {
        setHideName(false)
    }, [currentSpeaker])

    const showInspirationalQuote = () => {
        setFinished(true)
    }

    return (
        <div className="speaker-names padding--inline-4 padding--block-4 slide-in-blurred-bottom">
            {!finished && <div className="window padding--inline-4 padding--block-4">
                {speakersRoll.length > 0 ? <>
                    <h1 className={hideName ? "bigname margin--bottom-1 text-blur-out" : "bigname margin--bottom-1 text-focus-in"}>{speakersRoll[currentSpeaker].name}</h1>
                    {showIceBreakers && <h5 className={hideName ? "ice-breaker text-blur-out" : "ice-breaker text-focus-in"}>{currentQuestion} <span className="pass" onClick={changeIceBreaker} data-cursor-color="rgba(0,0,0,0.3)">&raquo;</span></h5>}
                    </> : null}
                    <hr className="margin--block-2" />
                {currentSpeaker < speakersRoll.length - 1 ? <>
                    <div className={hideName ? "on-deck margin--bottom-3 text-blur-out" : "on-deck margin--bottom-3 text-focus-in"}>
                        <div className="eyebrow--1">On Deck</div>
                        <h4>{currentSpeaker < speakersRoll.length - 1 ? speakersRoll[currentSpeaker + 1].name : null}</h4>
                    </div>
                </>
                : null}
                <div className="controls">
                    <button onClick={previousSpeaker} disabled={currentSpeaker > 0 ? false : true} data-cursor-color="rgba(0,0,0,0.3)">Previous</button>
                    {currentSpeaker !== speakersRoll.length - 1 && <button onClick={nextSpeaker} disabled={currentSpeaker < speakersRoll.length - 1 ? false : true} data-cursor-color="rgba(0,0,0,0.3)">Next</button>}
                    {currentSpeaker === speakersRoll.length - 1 && <button onClick={showInspirationalQuote} data-cursor-color="rgba(0,0,0,0.3)">Finish</button>}
                </div>
            </div>}
            {finished && <div className="window padding--inline-4 padding--block-4 slide-in-blurred-bottom">
                    <figure>
                        <blockquote className="margin--bottom-2">
                        <span className="quote">“</span><span>{quote.quote}</span><span className="quote">”</span>
                        </blockquote>
                        <figcaption>{quote.author}</figcaption>
                    </figure>
                </div>
            }
        </div>
    )
}

export default SpeakerNames
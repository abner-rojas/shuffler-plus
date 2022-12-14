import { useEffect, useState } from 'react' 
import WeatherWidget from './WeatherWidget'

interface Props{
    speakers: Array<Speaker>
    questions: Array<Question>
    showIceBreakers: Boolean
    quotes: Array<Quote>
    fortunes: Array<string>
}

const shuffleArray = (array:Array<Speaker>) => array.sort(() => 0.5 - Math.random());

const SpeakerNames:React.FC<Props> = ({speakers, questions, showIceBreakers, quotes, fortunes}) => {
    
    const timeoutDelay = 1000
    const [currentSpeaker, setCurrentSpeaker] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(questions[Math.floor(Math.random() * questions.length)].question)
    const [quote] = useState<Quote>(quotes[Math.floor(Math.random() * quotes.length)])
    const [fortune, setFortune] = useState(fortunes[Math.floor(Math.random() * questions.length)])
    const [speakersRoll, setSpeakersRoll] = useState<Array<Speaker>>([])
    const [imsArray, setImsArray] = useState<Array<Speaker>>([])
    const [devsArray, setDevsArray] = useState<Array<Speaker>>([])
    const [devLeadArray, setDevLeadArray] = useState<Array<Speaker>>([])
    const [imLeadArray, setImLeadArray] = useState<Array<Speaker>>([])
    const [hideName, setHideName] = useState<boolean>(false)
    const [finished, setFinished] = useState<boolean>(false)
    const [location, setLocation] = useState<string>()
    const [showFortune, setShowFortune] = useState<boolean>(false)

    const previousSpeaker = () => {
        setHideName(true)
        setShowFortune(false)
        currentSpeaker > 0 ? setTimeout(()=>{setCurrentSpeaker(currentSpeaker - 1)}, timeoutDelay) : null
        currentSpeaker > 0 ? setTimeout(()=>{setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)].question)}, timeoutDelay) : null
        currentSpeaker > 0 ? setTimeout(()=>{setFortune(fortunes[Math.floor(Math.random() * fortunes.length)])}, timeoutDelay) : null
        setLocation(speakersRoll[currentSpeaker].location)
    }

    const nextSpeaker = () => {
        setHideName(true)
        setShowFortune(false)
        currentSpeaker < speakersRoll.length - 1 ? setTimeout(()=>{setCurrentSpeaker(currentSpeaker + 1)}, timeoutDelay) : null
        currentSpeaker < speakersRoll.length - 1 ? setTimeout(()=>{setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)].question)}, timeoutDelay) : null
        currentSpeaker < speakersRoll.length - 1 ? setTimeout(()=>{setFortune(fortunes[Math.floor(Math.random() * fortunes.length)])}, timeoutDelay) : null
        setLocation(speakersRoll[currentSpeaker].location)
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

    useEffect(() => {
        if (speakersRoll.length > 0)
        setLocation(speakersRoll[currentSpeaker].location)
    }, [speakersRoll, currentSpeaker])

    const showInspirationalQuote = () => {
        setFinished(true)
    }

    const handleFortuneButton = () => {
        setShowFortune(!showFortune)
    }

    return (
        <div className="speaker-names padding--inline-4 padding--block-4 slide-in-blurred-bottom">
            {!finished && <div className="window padding--inline-4 padding--block-4">
                {speakersRoll.length > 0 ? <>
                    {location && <WeatherWidget city={location}/>}
                    <h1 className={hideName ? "bigname margin--bottom-1 text-blur-out" : "bigname margin--bottom-1 text-focus-in"}>
                        {speakersRoll[currentSpeaker].name}
                        <button onClick={handleFortuneButton} className="fortune-button" data-cursor-color={"rgba(0,0,0,0.44)"}>
                            <svg x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
                            <circle className='circle' cx="256" cy="256" r="256"/>
                            <path className='shadow' d="M299.292,508.337c112.059-19.089,199.292-110.99,211.289-225.311l-83.915-83.915l-54.589,5.172
                                l-68.382,4.022L147.499,356.543L299.292,508.337z"/>
                            <rect x="312.889" y="199.111" className='tag' width="113.778" height="56.889"/>
                            <path className='cookie1' d="M248.396,132.853c-74.347,0-134.618,60.269-134.618,134.618c0,49.819,27.083,93.284,67.31,116.564
                                c40.226-23.28,67.31-66.744,67.31-116.564c0-0.034-0.002-0.069-0.002-0.103c0.002,0,0.003,0,0.005,0
                                c0,0.034-0.003,0.069-0.003,0.103c0,49.819,27.083,93.284,67.31,116.564c40.226-23.28,67.31-66.744,67.31-116.564
                                C383.014,193.122,322.744,132.853,248.396,132.853z"/>
                            <path className='cookie2' d="M248.396,267.471c0-0.034-0.002-0.069-0.002-0.103c0.002,0,0.003,0,0.005,0
                                C248.399,267.402,248.396,267.436,248.396,267.471c0,49.819,27.083,93.284,67.31,116.564c40.226-23.28,67.31-66.744,67.31-116.564
                                c0-74.347-60.271-134.618-134.618-134.618v134.618H248.396z"/>
                            </svg>
                            {showFortune  && <div className="fortune paragraph--2 ">
                                <span className="close" data-cursor-size={44} data-cursor-color={"rgba(0,0,0,0.44)"}>&#10005;</span>
                                {fortune}
                            </div>}
                        </button>
                    </h1>
                    {showIceBreakers && <h5 className={hideName ? "ice-breaker text-blur-out" : "ice-breaker text-focus-in"} data-cursor-color={"rgba(0,0,0,0.2)"}>{currentQuestion} <button className="pass" onClick={changeIceBreaker}>&raquo;</button></h5>}
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
                    <button onClick={previousSpeaker} disabled={currentSpeaker > 0 ? false : true} data-cursor-color={"rgba(0,0,0,0.2)"} data-cursor-size={200}>Previous</button>
                    {currentSpeaker !== speakersRoll.length - 1 && <button onClick={nextSpeaker} disabled={currentSpeaker < speakersRoll.length - 1 ? false : true} data-cursor-color={"rgba(0,0,0,0.2)"} data-cursor-size={200}>Next</button>}
                    {currentSpeaker === speakersRoll.length - 1 && <button onClick={showInspirationalQuote} data-cursor-color={"rgba(0,0,0,0.2)"} data-cursor-size={200}>Finish</button>}
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
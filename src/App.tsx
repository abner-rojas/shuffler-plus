import { useEffect, useState, useRef } from 'react'
import './scss/app.scss'
import { Cursor } from 'react-creative-cursor';
import 'react-creative-cursor/dist/styles.css';
import Loading from './components/Loading'
import Logo from './components/Logo'
import Speakers from './components/Speakers'
import SpeakerNames from './components/SpeakerNames'
import DiamondsBackground from './components/DiamondsBackground'
import SettingsMenu from './components/SettingsMenu'

interface Settings {
  diamondCount: number,
  theme: string,
  showIceBreakers: boolean
}

const sortSpeakers = (speakers: Array<Speaker>) => {
  return speakers.sort((a: any, b: any) => {
      if(a.role === b.role){
          return a.name < b.name ? -1 : 1
      }else{
          return a.role > b.role ? -1 : 1
      }
  })
}

function App() {

  const timeElapsed = Date.now()
  const today = new Date(timeElapsed)
  const defaultSettings = {diamondCount: 10, theme: 'the-beach', showIceBreakers: true}
  const [loading, setLoading] = useState<boolean>(true)
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [speakers, setSpeakers] = useState<Array<Speaker>>([])
  const [start, setStart] = useState<boolean>(false)
  const [questions, setQuestions] = useState<Array<Question>>([])
  const [quotes, setQuotes] = useState<Array<Quote>>([])

  useEffect(() => {
    setTimeout(() => setLoading(false), 4000)
  }, [])

  //use default settting if localStorage settings not set
  useEffect(() => {
    
    if(localStorage.getItem('settings') === null){
      localStorage.setItem('settings', JSON.stringify(defaultSettings))
    } else {
      setSettings(JSON.parse(localStorage.getItem('settings')!))
    }

  }, [])

  const getSpeakersFromJSON = async () => {
    console.log("getSpeakersFromJSON");
    
    //get speakers from json file
    const response = await fetch('/team-members.json')
    const result: Array<Speaker> = await response.json()
  
    //sort by role and alphabetize
    const sortedSpeakers: Array<Speaker> = sortSpeakers(result)
    localStorage.setItem('speakers', JSON.stringify(sortedSpeakers))
    setSpeakers(sortedSpeakers)
  }

  const getQuestionsFromJSON = async () => {
    //get speakers from json file
    const response = await fetch('/ice-breaker-questions.json')
    const result = await response.json()
    setQuestions(result)
  }

  const getQuotesFromJSON = async () => {
    //get speakers from json file
    const response = await fetch('/inspirational-quotes.json')
    const result = await response.json()
    setQuotes(result)
  }

  useEffect(() => {
    //get speakers from LocalStorage if set, otherwise get them from JSON
    if(localStorage.getItem('speakers') === null){
        getSpeakersFromJSON()
    } else {
        setSpeakers(JSON.parse(localStorage.getItem('speakers')!))
    }
  }, [])

  useEffect(() => {
    getQuestionsFromJSON()
  },[])

  useEffect(() => {
    getQuotesFromJSON()
  },[])

  const updateSpeakers = (updatedSpeakers: Array<Speaker>) => {
    const sortedUpdatedSpeakers = sortSpeakers(updatedSpeakers)
    localStorage.setItem('speakers', JSON.stringify(sortedUpdatedSpeakers))
    setSpeakers(sortedUpdatedSpeakers)
  }

  const resetSpeakers = () => {
    localStorage.removeItem('speakers')
    localStorage.removeItem('settings')
    getSpeakersFromJSON()
    setSettings(defaultSettings)
    setStart(false)
  }

  //handle theme switch
  const switchTheme = (theme:any) => {
    localStorage.setItem('settings', JSON.stringify({...settings, theme: theme}))
    setSettings({...settings, theme: theme})
    console.log("Switch Theme", settings)
  }

  //handle theme switch
  const switchDiamonds = (count:number) => {
    localStorage.setItem('settings', JSON.stringify({...settings, diamondCount: count}))
    setSettings({...settings, diamondCount: count})
    console.log("Switch Diamonds", typeof(count))
  }

  //handle ice breakers switch
  const switchIceBreakers = (show:boolean) => {
    localStorage.setItem('settings', JSON.stringify({...settings, showIceBreakers: show}))
    setSettings({...settings, showIceBreakers: show})
    console.log("Switch IceBreakers", settings)
  }

  const handleStart = () => {
    setStart(true)
  }

  const goHome = () => {
    setStart(false)
  }

  return (
    <div className={`App theme-${settings.theme}`}>
      <Loading show={loading} />
      <SettingsMenu switchTheme={switchTheme} switchDiamonds={switchDiamonds} switchIceBreakers={switchIceBreakers} resetSpeakers={resetSpeakers} settings={settings} />
      <DiamondsBackground theme={settings.theme} diamondCount={settings.diamondCount} />
      <div className="main-container padding--inline-2 padding--top-4 padding--bottom-2">
        <Logo goHome={goHome} />
        <div className={`headings margin--block-2 ${start ? 'slide-out-blurred-top' : 'slide-in-blurred-top' }`}>
          <h1 className="text-center" data-cursor-exclusion>Diamond Hands</h1>
          <h2 className="text-center text-outline margin--bottom-4" data-cursor-exclusion>Stand-up <span className="date">{`${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`}</span></h2>
        </div>

        <div className={`speakers-setup window ${start ? 'slide-out-blurred-bottom' : null}`}>
          <Speakers updateSpeakers={updateSpeakers} speakers={speakers} />
          <hr />
          <div className="padding--inline-2 padding--block-1 place-center">
            <button onClick={handleStart} data-cursor-color="rgba(0,0,0,0.3)">Start</button>
          </div> 
        </div>
        {start && <SpeakerNames speakers={speakers} questions={questions} showIceBreakers={settings.showIceBreakers} quotes={quotes} />} 
      </div>
      <Cursor isGelly={true} cursorBackgrounColor={"rgba(255,255,255,0.9"} cursorSize={44} />
    </div>
  )
}

export default App

import { useEffect, useState, useRef } from 'react'
import './scss/app.scss'
import { Cursor } from 'react-creative-cursor';
import 'react-creative-cursor/dist/styles.css';
import Loading from './components/Loading'
import Speakers from './components/Speakers'
import SpeakerNames from './components/SpeakerNames'
import DiamondsBackground from './components/DiamondsBackground'
import SettingsMenu from './components/SettingsMenu'

interface Speaker {
  id: number,
  name: string,
  role: string,
  here: boolean
}

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
  const [loading, setLoading] = useState<Boolean>(true)
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [speakers, setSpeakers] = useState<Array<Speaker>>([])
  const [start, setStart] = useState<Boolean>(false)
  const [questions, setQuestions] = useState<String>()
  const [quotes, setQuotes] = useState<String>()

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
  const switchDiamonds = (count:any) => {
    localStorage.setItem('settings', JSON.stringify({...settings, diamondCount: count}))
    setSettings({...settings, diamondCount: count})
    console.log("Switch Diamonds", settings)
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

  return (
    <div className={`App theme-${settings.theme}`}>
      <Loading show={loading} />
      <div className="logo">

        <svg x="0px" y="0px" viewBox="0 0 336.8 358">
          <path className="logo-0" d="M336.8,159.3l-21.8,92.3l-13.8-17.7L282,248.8c-11.7,9.1-26.3,14.9-41.9,16.6c-3.1,0.4-6.2,0.5-9.3,0.6
            c-19,0.2-37.3-5.5-51.5-16.1v0L107.2,196c-2.7-2-10.3-1.9-13,0.1l-48.8,38L0,175.9l48.8-38c14-10.9,32.2-17,51.2-17.2
            c19-0.2,37.3,5.5,51.5,16.1l72.2,53.9c0.2,0.1,0.4,0.2,0.6,0.4c3.1,1.6,9.9,1.4,12.4-0.5l19.1-14.9l-13.8-17.7L336.8,159.3z"/>
          <path className="logo-1" d="M216.8,220.7c6.8,16.4,7.9,35.5,3.1,53.9c-4.8,18.4-15.2,34.5-29.2,45.4L142,358l-45.5-58.3l48.8-38
            c2.7-2.1,4.6-9.5,3.3-12.6L114,166c-6.8-16.4-7.9-35.5-3.1-53.9c4.8-18.4,15.2-34.5,29.2-45.4l19.1-14.9l-13.8-17.7l94.8,1.4
            l-21.8,92.3l-13.8-17.7L185.5,125c-2.7,2.1-4.6,9.5-3.3,12.5L216.8,220.7z"/>
          <g>
            <path className="logo-2" d="M267.9,24.1h23.9V0h20.2v24.1h24.1v20.2h-24.1v23.9h-20.2V44.2h-23.9V24.1z"/>
          </g>
        </svg>

      </div>
      
      <SettingsMenu switchTheme={switchTheme} switchDiamonds={switchDiamonds} switchIceBreakers={switchIceBreakers} resetSpeakers={resetSpeakers} settings={settings} />
      <DiamondsBackground theme={settings.theme} diamondCount={settings.diamondCount} />
      <div className="main-container padding--inline-2 padding--top-4 padding--bottom-2">
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

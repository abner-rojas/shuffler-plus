import { useEffect, useState } from 'react'
import './scss/app.scss'
import { Cursor } from 'react-creative-cursor'
import 'react-creative-cursor/dist/styles.css'
import Loading from './components/Loading'
import Logo from './components/Logo'
import Speakers from './components/Speakers'
import SpeakerNames from './components/SpeakerNames'
import DiamondsBackground from './components/DiamondsBackground'
import SettingsMenu from './components/SettingsMenu'

interface Settings {
  diamondCount: number,
  theme: string,
  config: string,
  showDiamonds: boolean,
  showIceBreakers: boolean,
  showFortuneCookie: boolean
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
  const defaultSettings = {config: 'squad-b', diamondCount: 10, theme: 'beach', showIceBreakers: true, showFortuneCookie: true, showDiamonds: false}
  const [loading, setLoading] = useState<boolean>(true)
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [speakers, setSpeakers] = useState<Array<Speaker>>([])
  const [start, setStart] = useState<boolean>(false)
  const [questions, setQuestions] = useState<Array<Question>>([])
  const [quotes, setQuotes] = useState<Array<Quote>>([])
  const [fortunes, setFortunes] = useState<Array<string>>([])
  const [squadName, setSquadName] = useState<string>('Squad B')

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

  const getConfigFromJSON = async () => {
    //get speakers from json files
    console.log('file', `/settings-${settings.config}.json`)
    const response = await fetch(`/settings-${settings.config}.json`)
    const json = await response.json()
    
    //set the squad name
    setSquadName(json[0].squad)
  
    //sort by role and alphabetize
    const sortedSpeakers: Array<Speaker> = sortSpeakers(json[0].team)
    localStorage.setItem('speakers', JSON.stringify(sortedSpeakers))
    setSpeakers(sortedSpeakers)

    console.log('sordteSpeakers', sortedSpeakers)
  }

  const getQuestionsFromJSON = async () => {
    //get speakers from json file
    const response = await fetch('/ice-breaker-questions.json')
    const result = await response.json()
    setQuestions(result)
  }

  const getFortunesFromJSON = async () => {
    //get speakers from json file
    const response = await fetch('/fortunes.json')
    const result = await response.json()
    setFortunes(result)
  }

  const getQuotesFromJSON = async () => {
    //get speakers from json file
    const response = await fetch('/inspirational-quotes.json')
    const result = await response.json()
    setQuotes(result)
  }

  useEffect(() => {
    getConfigFromJSON()
  }, [settings.config]);

  useEffect(() => {
    //get speakers from LocalStorage if set, otherwise get them from JSON
    if(localStorage.getItem('speakers') === null){
        getConfigFromJSON()
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

  useEffect(() => {
    getFortunesFromJSON()
  },[])

  const updateSpeakers = (updatedSpeakers: Array<Speaker>) => {
    const sortedUpdatedSpeakers = sortSpeakers(updatedSpeakers)
    localStorage.setItem('speakers', JSON.stringify(sortedUpdatedSpeakers))
    setSpeakers(sortedUpdatedSpeakers)
  }

  const resetSpeakers = () => {
    localStorage.removeItem('speakers')
    localStorage.removeItem('settings')
    getConfigFromJSON()
    setSettings(defaultSettings)
    setStart(false)
  }

  //handle theme switch
  const switchTheme = (theme:any) => {
    localStorage.setItem('settings', JSON.stringify({...settings, theme: theme}))
    setSettings({...settings, theme: theme})
  }

  //handle squad config file
  const switchSquad = (config:string) => {
    localStorage.removeItem('speakers')
    localStorage.removeItem('settings')
    localStorage.setItem('settings', JSON.stringify({...settings, config: config}))
    setSettings({...settings, config: config})

    setStart(false)
  }

  //handle theme switch
  const switchDiamonds = (count:number) => {
    localStorage.setItem('settings', JSON.stringify({...settings, diamondCount: count}))
    setSettings({...settings, diamondCount: count})
  }

  //handle showDiamonds switch
  const showDiamonds = (show:boolean) => {
    localStorage.setItem('settings', JSON.stringify({...settings, showDiamonds: show}))
    setSettings({...settings, showDiamonds: show})
  }

  //handle ice breakers switch
  const switchIceBreakers = (show:boolean) => {
    localStorage.setItem('settings', JSON.stringify({...settings, showIceBreakers: show}))
    setSettings({...settings, showIceBreakers: show})
  }

  //handle fortune cookie show
  const showFortuneCookie = (show:boolean) => {
    localStorage.setItem('settings', JSON.stringify({...settings, showFortuneCookie: show}))
    setSettings({...settings, showFortuneCookie: show})
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
      <SettingsMenu switchSquad={switchSquad} switchTheme={switchTheme} switchDiamonds={switchDiamonds} showDiamonds={showDiamonds} switchIceBreakers={switchIceBreakers} showFortuneCookie={showFortuneCookie} resetSpeakers={resetSpeakers} settings={settings} />
      {settings.showDiamonds && <DiamondsBackground theme={settings.theme} diamondCount={settings.diamondCount} />}
      <div className="main-container padding--inline-2 padding--top-4 padding--bottom-2" style={{ backdropFilter: settings.showDiamonds ? 'unset': 'blur(4px)'}}>
        <Logo goHome={goHome} />
        <div className={`headings margin--block-2 ${start ? 'slide-out-blurred-top' : 'slide-in-blurred-top' }`}>
          <h1 className="text-center" data-cursor-exclusion>{squadName}</h1>
          <h2 className="text-center text-outline margin--bottom-4" data-cursor-exclusion>Stand-up <span className="date">{`${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`}</span></h2>
        </div>

        <div className={`speakers-setup window ${start ? 'slide-out-blurred-bottom' : null}`}>
          <Speakers updateSpeakers={updateSpeakers} speakers={speakers} />
          <hr />
          <div className="padding--inline-2 padding--block-1 place-center">
            <button onClick={handleStart} data-cursor-color={"rgba(0,0,0,0.2)"} data-cursor-size={200}>Start</button>
          </div> 
        </div>
        {start && <SpeakerNames speakers={speakers} questions={questions} showIceBreakers={settings.showIceBreakers} showFortuneCookie={settings.showFortuneCookie} quotes={quotes} fortunes={fortunes} />} 
      </div>
      <Cursor isGelly={true} cursorBackgrounColor={"rgba(255,255,255,0.9"} cursorSize={44} gellyAnimationAmount={100} />
    </div>
  )
}

export default App
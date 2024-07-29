import { useState } from "react"

interface Props {
    switchSquad: Function
    switchTheme: Function
    switchDiamonds: Function
    showDiamonds: Function
    switchIceBreakers: Function 
    showFortuneCookie: Function 
    resetSpeakers: Function 
    settings: Settings
}

const SettingsMenu:React.FC<Props> = ({switchSquad, switchTheme, switchDiamonds, showDiamonds, switchIceBreakers, showFortuneCookie, resetSpeakers, settings}) => {

    const [visible, setVisible] = useState(false)

    const handleThemeSwitch = (e:any) => {
        switchTheme(e.target.dataset.theme)
    }

    const handleShowDiamondsToggle = (e:any) => {
        showDiamonds(!settings.showDiamonds)
    }

    const handleDiamonds = (e:any) => {
        switchDiamonds(parseInt(e.target.value))
    }

    const handleIceBreakersToggle = () => {
        switchIceBreakers(!settings.showIceBreakers)
    }

    const handleFortuneCookieToggle = () => {
        showFortuneCookie(!settings.showFortuneCookie)
    }

    const handleSquadSwitch = (e:any) => {
        switchSquad(e.target.dataset.config)
    }

    const handleResetSpeakers = () => {
        resetSpeakers()
    }

    const showMenu = () => {
        setVisible(!visible)
    }


    return (
        <>
            <div className="settings-toggle-button">
                <button onClick={showMenu} data-cursor-color="rgba(0,0,0,0.3)">
                    <svg viewBox="0 0 512 512">
                        <path d="M424.5,216.5h-15.2c-12.4,0-22.8-10.7-22.8-23.4c0-6.4,2.7-12.2,7.5-16.5l9.8-9.6c9.7-9.6,9.7-25.3,0-34.9l-22.3-22.1  c-4.4-4.4-10.9-7-17.5-7c-6.6,0-13,2.6-17.5,7l-9.4,9.4c-4.5,5-10.5,7.7-17,7.7c-12.8,0-23.5-10.4-23.5-22.7V89.1  c0-13.5-10.9-25.1-24.5-25.1h-30.4c-13.6,0-24.4,11.5-24.4,25.1v15.2c0,12.3-10.7,22.7-23.5,22.7c-6.4,0-12.3-2.7-16.6-7.4l-9.7-9.6  c-4.4-4.5-10.9-7-17.5-7s-13,2.6-17.5,7L110,132c-9.6,9.6-9.6,25.3,0,34.8l9.4,9.4c5,4.5,7.8,10.5,7.8,16.9  c0,12.8-10.4,23.4-22.8,23.4H89.2c-13.7,0-25.2,10.7-25.2,24.3V256v15.2c0,13.5,11.5,24.3,25.2,24.3h15.2  c12.4,0,22.8,10.7,22.8,23.4c0,6.4-2.8,12.4-7.8,16.9l-9.4,9.3c-9.6,9.6-9.6,25.3,0,34.8l22.3,22.2c4.4,4.5,10.9,7,17.5,7  c6.6,0,13-2.6,17.5-7l9.7-9.6c4.2-4.7,10.2-7.4,16.6-7.4c12.8,0,23.5,10.4,23.5,22.7v15.2c0,13.5,10.8,25.1,24.5,25.1h30.4  c13.6,0,24.4-11.5,24.4-25.1v-15.2c0-12.3,10.7-22.7,23.5-22.7c6.4,0,12.4,2.8,17,7.7l9.4,9.4c4.5,4.4,10.9,7,17.5,7  c6.6,0,13-2.6,17.5-7l22.3-22.2c9.6-9.6,9.6-25.3,0-34.9l-9.8-9.6c-4.8-4.3-7.5-10.2-7.5-16.5c0-12.8,10.4-23.4,22.8-23.4h15.2  c13.6,0,23.3-10.7,23.3-24.3V256v-15.2C447.8,227.2,438.1,216.5,424.5,216.5z M336.8,256L336.8,256c0,44.1-35.7,80-80,80  c-44.3,0-80-35.9-80-80l0,0l0,0c0-44.1,35.7-80,80-80C301.1,176,336.8,211.9,336.8,256L336.8,256z"/>
                    </svg>
                </button>
            </div>
            <div className={visible ? 'visible settings-menu padding--block-2 padding--inline-2' : 'settings-menu padding--block-2 padding--inline-2'}>
                <h5 className="margin--bottom-3">Settings</h5>
                <ul className="paragraph-1 form padding--inline-2">
                    <li><div className="toggle-speaker-name">Squad</div>
                        <ul>
                            <li><span onClick={handleSquadSwitch} className={settings.config == 'capybaras' ? 'active' : undefined} data-config="capybaras" data-cursor-color="rgba(0,0,0,0.3)">Capybaras</span></li>
                        </ul>
                    </li>
                    <li className="margin--bottom-1"><div className="toggle-speaker-name">Theme</div>
                        <ul>
                            <li><span onClick={handleThemeSwitch} className={settings.theme == 'beach' ? 'active' : undefined} data-theme="beach" data-cursor-color="rgba(0,0,0,0.3)">The Beach</span></li>
                            <li><span onClick={handleThemeSwitch} className={settings.theme == 'space' ? 'active' : undefined} data-theme="space" data-cursor-color="rgba(0,0,0,0.3)">Space</span></li>
                            <li><span onClick={handleThemeSwitch} className={settings.theme == 'holidays' ? 'active' : undefined} data-theme="holidays" data-cursor-color="rgba(0,0,0,0.3)">Holidays</span></li>
                            <li><span onClick={handleThemeSwitch} className={settings.theme == 'neon' ? 'active' : undefined} data-theme="neon" data-cursor-color="rgba(0,0,0,0.3)">Neon</span></li>
                            <li><span onClick={handleThemeSwitch} className={settings.theme == 'valentine' ? 'active' : undefined} data-theme="valentine" data-cursor-color="rgba(0,0,0,0.3)">Valentine</span></li>
                            <li><span onClick={handleThemeSwitch} className={settings.theme == 'carnival' ? 'active' : undefined} data-theme="carnival" data-cursor-color="rgba(0,0,0,0.3)">Carnival</span></li>
                            <li><span onClick={handleThemeSwitch} className={settings.theme == 'stpatrick' ? 'active' : undefined} data-theme="stpatrick" data-cursor-color="rgba(0,0,0,0.3)">St. Patrick's Day</span></li>
                            <li><span onClick={handleThemeSwitch} className={settings.theme == 'halloween' ? 'active' : undefined} data-theme="halloween" data-cursor-color="rgba(0,0,0,0.3)">Halloween</span></li>
                            <li><span onClick={handleThemeSwitch} className={settings.theme == 'dayofthedead' ? 'active' : undefined} data-theme="dayofthedead" data-cursor-color="rgba(0,0,0,0.3)">Day of the Dead</span></li>
                        </ul>
                    </li>
                    <li className="toggle-form">
                     <div className="speaker-input-group">
                        <div className="toggle" data-cursor-color="rgba(0,0,0,0.3)">
                        <input id="iceBreakerToggle" type="checkbox" onChange={handleIceBreakersToggle} checked={!settings.showIceBreakers} />
                        <label htmlFor="iceBreakerToggle" className="toggle-item">
                            <div className="check"></div>
                        </label>
                        </div>
                        <div className="toggle-speaker-name" data-cursor-exclusion>
                            <span>Ice Breakers</span>
                        </div>
                    </div>
                    </li>
                    <li className="toggle-form">
                     <div className="speaker-input-group">
                        <div className="toggle" data-cursor-color="rgba(0,0,0,0.3)">
                        <input id="fortuneCookieToggle" type="checkbox" onChange={handleFortuneCookieToggle} checked={!settings.showFortuneCookie} />
                        <label htmlFor="fortuneCookieToggle" className="toggle-item">
                            <div className="check"></div>
                        </label>
                        </div>
                        <div className="toggle-speaker-name" data-cursor-exclusion>
                            <span>Fortune Cookie</span>
                        </div>
                    </div>
                    </li>
                    <li className="toggle-form">
                        <div className="speaker-input-group">
                            <div className="toggle" data-cursor-color="rgba(0,0,0,0.3)">
                            <input id="showDiamondToggle" type="checkbox" onChange={handleShowDiamondsToggle} checked={!settings.showDiamonds} />
                            <label htmlFor="showDiamondToggle" className="toggle-item">
                                <div className="check"></div>
                            </label>
                            </div>
                            <div className="toggle-speaker-name" data-cursor-exclusion>
                                <span>Show Diamonds</span>
                            </div>
                        </div>
                    </li>
                   {settings.showDiamonds && <li className="inline-form">Diamonds <input type="number" min="0" max="44" value={settings.diamondCount} onChange={handleDiamonds} data-cursor-color="rgba(0,0,0,0.3)"/></li>}
                    <li className="buttons">
                        <button onClick={handleResetSpeakers} data-cursor-color="rgba(0,0,0,0.3)">Reset</button>
                        <button onClick={showMenu} data-cursor-color="rgba(0,0,0,0.3)">Close</button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SettingsMenu
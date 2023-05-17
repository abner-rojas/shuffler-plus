import { useState } from "react"

interface Props {
    switchTheme: Function
    switchDiamonds: Function
    showDiamonds: Function
    switchIceBreakers: Function 
    resetSpeakers: Function 
    settings: Settings
}

const ConfigMenu:React.FC<Props> = ({switchTheme, switchDiamonds, showDiamonds, switchIceBreakers, resetSpeakers, settings}) => {

    const [visible, setVisible] = useState(false)

    // const handleThemeSwitch = (e:any) => {
    //     switchTheme(e.target.dataset.theme)
    // }

    // const handleShowDiamondsToggle = (e:any) => {
    //     showDiamonds(!settings.showDiamonds)
    // }

    // const handleDiamonds = (e:any) => {
    //     switchDiamonds(parseInt(e.target.value))
    // }

    // const handleIceBreakersToggle = () => {
    //     switchIceBreakers(!settings.showIceBreakers)
    // }

    // const handleResetSpeakers = () => {
    //     resetSpeakers()
    // }

    const showMenu = () => {
        setVisible(!visible)
    }


    return (
        <>
            <div className="config-toggle-button">
                <button onClick={showMenu} data-cursor-color="rgba(0,0,0,0.3)">
                    <svg viewBox="0 0 512 512">
                        <path d="M424.5,216.5h-15.2c-12.4,0-22.8-10.7-22.8-23.4c0-6.4,2.7-12.2,7.5-16.5l9.8-9.6c9.7-9.6,9.7-25.3,0-34.9l-22.3-22.1  c-4.4-4.4-10.9-7-17.5-7c-6.6,0-13,2.6-17.5,7l-9.4,9.4c-4.5,5-10.5,7.7-17,7.7c-12.8,0-23.5-10.4-23.5-22.7V89.1  c0-13.5-10.9-25.1-24.5-25.1h-30.4c-13.6,0-24.4,11.5-24.4,25.1v15.2c0,12.3-10.7,22.7-23.5,22.7c-6.4,0-12.3-2.7-16.6-7.4l-9.7-9.6  c-4.4-4.5-10.9-7-17.5-7s-13,2.6-17.5,7L110,132c-9.6,9.6-9.6,25.3,0,34.8l9.4,9.4c5,4.5,7.8,10.5,7.8,16.9  c0,12.8-10.4,23.4-22.8,23.4H89.2c-13.7,0-25.2,10.7-25.2,24.3V256v15.2c0,13.5,11.5,24.3,25.2,24.3h15.2  c12.4,0,22.8,10.7,22.8,23.4c0,6.4-2.8,12.4-7.8,16.9l-9.4,9.3c-9.6,9.6-9.6,25.3,0,34.8l22.3,22.2c4.4,4.5,10.9,7,17.5,7  c6.6,0,13-2.6,17.5-7l9.7-9.6c4.2-4.7,10.2-7.4,16.6-7.4c12.8,0,23.5,10.4,23.5,22.7v15.2c0,13.5,10.8,25.1,24.5,25.1h30.4  c13.6,0,24.4-11.5,24.4-25.1v-15.2c0-12.3,10.7-22.7,23.5-22.7c6.4,0,12.4,2.8,17,7.7l9.4,9.4c4.5,4.4,10.9,7,17.5,7  c6.6,0,13-2.6,17.5-7l22.3-22.2c9.6-9.6,9.6-25.3,0-34.9l-9.8-9.6c-4.8-4.3-7.5-10.2-7.5-16.5c0-12.8,10.4-23.4,22.8-23.4h15.2  c13.6,0,23.3-10.7,23.3-24.3V256v-15.2C447.8,227.2,438.1,216.5,424.5,216.5z M336.8,256L336.8,256c0,44.1-35.7,80-80,80  c-44.3,0-80-35.9-80-80l0,0l0,0c0-44.1,35.7-80,80-80C301.1,176,336.8,211.9,336.8,256L336.8,256z"/>
                    </svg>
                </button>
            </div>
            <div className={visible ? 'visible config-menu padding--block-2 padding--inline-2' : 'config-menu padding--block-2 padding--inline-2'}>
                <h2>Choose a config file</h2>
            </div>
        </>
    )
}

export default ConfigMenu
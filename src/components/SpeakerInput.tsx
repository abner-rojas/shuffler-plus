import { useState, useEffect } from 'react'

interface Props {
    speaker: Speaker
    updateSpeaker: Function
}

const SpeakerInput:React.FC<Props> = ({speaker, updateSpeaker}) => {

    const [checked, setChecked] = useState<boolean>(!speaker.here)

    const handleToggle = (e:any) => {
        updateSpeaker(e.target.value, !e.target.checked) 
    }

    useEffect(() =>  {
        setChecked(!speaker.here)
    }, [speaker])

    return (
    <div className="speaker-input-group">
        <div className="toggle" data-cursor-color="rgba(0,0,0,0.3)">
            <input id={`${speaker.id}`} type="checkbox" value={speaker.id} onChange={handleToggle} checked={checked} />
            <label htmlFor={`${speaker.id}`} className="toggle-item">
                <div className="check"></div>
            </label>
        </div>
        <div className="toggle-speaker-name" data-cursor-exclusion>
            <span>{speaker.name}</span>
            {/* <span className={`role ${speaker.role}`}>{speaker.role}</span>  */}
        </div>
    </div>
    )
}

export default SpeakerInput
import { useEffect, useState, useRef } from 'react'
import SpeakerInput from './SpeakerInput'
import SpeakerForm from './SpeakerForm'

interface Props {
    updateSpeakers: Function
    speakers: Array<Speaker>
}

const Speakers:React.FC<Props> = ({updateSpeakers, speakers}) => {

    const addSpeaker = (name: string, role: string) => {
        const ids = speakers.map((a) => a.id)
        const highestID = Math.max(...ids)
        const names = speakers.map((a) => a.name)

        //check for dupe name
        names.indexOf(name) === -1 ? updateSpeakers([...speakers, {id: highestID + 1, name: name, role: role, here: true}]) : null
    }

    const updateSpeaker = (speakerId:string, checked:boolean) => {
        //update speakers after toggle click
        
        const updatedSpeakers = speakers.map( (speaker) => speaker.id === parseInt(speakerId) ? {...speaker, here: checked} : speaker )
        updateSpeakers(updatedSpeakers) 
    }

    return (<>
      <SpeakerForm addSpeaker={addSpeaker} />
      <div className="speaker-lists padding--inline-1 padding--block-2">
        <div>
            <ul className="margin--bottom-2">
                {speakers.map( speaker => speaker.role === 'lead' ? (
                    <li key={speaker.id}>
                    <SpeakerInput speaker={speaker} updateSpeaker={updateSpeaker} />
                    </li>
                ) : null)}
            </ul>
            <ul>
            {speakers.map( speaker => speaker.role === 'im' ? (
                <li key={speaker.id}>
                <SpeakerInput speaker={speaker} updateSpeaker={updateSpeaker} />
                </li>
            ) : null)}
            </ul>
        </div>
        <div>
            <ul>
            {speakers.map( speaker => speaker.role === 'dev' ? (
                <li key={speaker.id}>
                <SpeakerInput speaker={speaker} updateSpeaker={updateSpeaker} />
                </li>
            ) : null)}
            </ul>
        </div>
      </div>
    </>)

}

export default Speakers
import React, { useState } from 'react';

const ToDoForm = ({ addSpeaker }) => {

    const [ inputName, setInputName ] = useState('')
    const [ inputRole, setInputRole ] = useState('im')
    const [ formToggle, setFormToggle] = useState(false)
    const [ formToggleSymbol, setFormToggleSymbol] = useState('Add Speaker')

    const handleNameChange = (e: any) => {
        setInputName(e.currentTarget.value)
    }

    const handleRoleChange = (e: any) => {
        setInputRole(e.currentTarget.value)
    }

    const toTitleCase = (phrase: string) => {
        return phrase
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        addSpeaker(toTitleCase(inputName), inputRole);
        setInputName('');
    }

    const toggleAddSpeakerForm = () => {
        setFormToggle(!formToggle)
        setFormToggleSymbol(formToggle ? "Add Speaker" : "Cancel")
    }

    return (
        <div className='speakers-header padding--inline-2 padding--block-1'>
            <h3 data-cursor-exclusion>Roll Call</h3>
            <div className="form">    
                {formToggle && (
                <form onSubmit={handleSubmit}>
                    <input value={inputName} type="text" onChange={handleNameChange} placeholder="NAME" required data-cursor-exclusion />
                    <select onChange={handleRoleChange} data-cursor-exclusion>
                        <option value="im">IM/IC</option>
                        <option value="dev">DEV/Content/QA</option>
                    </select>
                    <button data-cursor-color="rgba(0,0,0,0.3)">Add</button>
                </form>
                )}
                <button onClick={toggleAddSpeakerForm} data-cursor-color="rgba(0,0,0,0.3)">{formToggleSymbol}</button>
            </div>
        </div>
    );
};

export default ToDoForm
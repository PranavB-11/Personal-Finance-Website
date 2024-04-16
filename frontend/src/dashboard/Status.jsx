import { useState } from 'react'

import './Status.css'
import DashEntry from './DashEntry'
import Modal from '../modal/modal'; 

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

function Status({ SectionList }) {
    // Add section modal
    const [addSection, setAddSection] = useState(false);
    const addSectionOpen = () => {
        setAddSection(true)
    }
    const addSectionClose = () => {
        setAddSection(false)
    }
    const addSectionDatabase = async () => {
        // Get form data
        const section = document.getElementById("add-section-name").value
        const budget = document.getElementById("add-section-budget").value
        const frequency = document.getElementById("add-section-frequency").value
        const startDate = document.getElementById("add-section-date").value

        // Get authentication data
        const username = getCookie('username')
        const password = getCookie('password')

        // Add section
        const data = { username, password, section, budget, frequency, startDate }
        const response = await fetch('http://localhost:3000/section', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
         })
        const responseData = await response.json()
        
        if (responseData.success) {
            location.reload()
        }
    }

    return (
        <div id="status-outer-container">
            <div id="status-container">
                <div id="status-inner-container">
                    <h1>Dashboard</h1>
                    <p id="status-add-section" onClick={addSectionOpen}>Add Section</p>
                    {SectionList.map((section, index) => (
                        <DashEntry name={section.name} key={index}/>
                    ))}
                    <Modal isOpen={addSection} onClose={addSectionClose}>
                        <div className="status-modal-content">
                            <h2>Add section</h2>
                            <div className="status-modal-input-group">
                                <label htmlFor="sectionName">Section Name</label>
                                <input type="text" id="add-section-name" className="add-section-input"/>
                            </div>
                            <div className="status-modal-input-group">
                                <label htmlFor="budget">Budget</label>
                                <div className="input-with-symbol">
                                    <span>$</span>
                                    <input type="text" id="add-section-budget" className="add-section-input"/>
                                </div>
                            </div>
                            <div className="status-modal-input-group">
                                <label htmlFor="startdate">Start Date</label>
                                <input type="date" id="add-section-date" className="add-section-input"/>
                            </div>
                            <div className="status-modal-input-group">
                                <label htmlFor="frequency">Frequency (days)</label>
                                <input type="text" id="add-section-frequency" className="add-section-input"/>
                            </div>
                            <button type="submit" onClick={addSectionDatabase}>Submit</button>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Status
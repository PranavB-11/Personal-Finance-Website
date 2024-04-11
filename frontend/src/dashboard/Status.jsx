import React, { useState } from 'react'; 
import './Status.css';
import DashEntry from './DashEntry';
import Modal from '../modal/modal'; 

function Status() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEntryName, setCurrentEntryName] = useState('');
    const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);

    const openModalForEntry = (name) => {
        setCurrentEntryName(name);
        setIsModalOpen(true);
    };

    const toggleAddSectionModal = () => {
        setIsAddSectionModalOpen(!isAddSectionModalOpen);
    };

    return (
        <div id="status-outer-container">
            <div id="status-container">
                <div id="status-inner-container">
                    <h1>Dashboard</h1>
                    <p id="status-add-section" onClick={toggleAddSectionModal}>Add Section</p>
                    <DashEntry name={"Takeout Food"} budget={"low"} openModal={() => openModalForEntry("Takeout Food")} />
                    <DashEntry name={"Clothes"} budget={"medium"} openModal={() => openModalForEntry("Clothes")} />
                    <DashEntry name={"Grocery"} budget={"high"} openModal={() => openModalForEntry("Grocery")} />
                    <DashEntry name={"Laundry"} budget={"low"} openModal={() => openModalForEntry("Laundry")} />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="status-modal-content">
                    <h2>Details for {currentEntryName}</h2>
                </div>
            </Modal>

            <Modal isOpen={isAddSectionModalOpen} onClose={toggleAddSectionModal}>
                <div className="status-modal-content">
                    <h2>Add a New Section</h2>
                    
                    <div className="status-modal-input-group">
                        <label htmlFor="sectionName">Section Name</label>
                        <input type="text" id="sectionName" name="sectionName" />
                    </div>

                    <div className="status-modal-input-group">
                        <label htmlFor="budget">Budget</label>
                        <div className="input-with-symbol">
                            <span>$</span>
                            <input type="text" id="budget" name="budget" />
                        </div>
                    </div>
                    <div className="status-modal-input-group">
                        <label htmlFor="startdate">Start Date</label>
                        <input id="startdate" name="startdate"></input>
                    </div>
                    <div className="status-modal-input-group">
                        <label htmlFor="frequency">Frequency</label>
                        <input id="frequency" name="frequency"></input>
                    </div>
                </div>
            </Modal>

        </div>
    );
}

export default Status;

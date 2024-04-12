import React, { useState } from 'react'; 
import './Status.css';
import DashEntry from './DashEntry';
import Modal from '../modal/modal'; 

function Status() {
    // Unified modal state
    const [modalInfo, setModalInfo] = useState({
        isOpen: false,
        name: '',
        type: ''  // Indicates whether it's for adding a new section or showing details
    });

    // Function to open the modal for any section
    const openModal = (name, type) => {
        setModalInfo({
            isOpen: true,
            name: name,
            type: type
        });
    };

    // Function to close the modal
    const closeModal = () => {
        setModalInfo({ ...modalInfo, isOpen: false });
    };

    return (
        <div id="status-outer-container">
            <div id="status-container">
                <div id="status-inner-container">
                    <h1>Dashboard</h1>
                    <p id="status-add-section" onClick={() => openModal('New Section', 'add')}>Add Section</p>
                    {['Takeout Food', 'Clothes', 'Grocery', 'Laundry'].map((name, index) => (
                        <DashEntry 
                            key={index}
                            name={name} 
                            budget={['low', 'medium', 'high', 'low'][index]} 
                            openModal={() => openModal(name, 'details')} 
                        />
                    ))}
                </div>
            </div>

            <Modal isOpen={modalInfo.isOpen} onClose={closeModal}>
                <div className="status-modal-content">
                    <h2>{modalInfo.type === 'add' ? `Add ${modalInfo.name}` : `Details for ${modalInfo.name}`}</h2>
                    {modalInfo.type === 'add' ? (
                        <>
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
                        </>
                    ) : (
                        <p>Details content for {modalInfo.name}</p>
                    )}
                </div>
            </Modal>

        </div>
    );
}

export default Status;

import React, { useState } from 'react'; 
import './Status.css';
import DashEntry from './DashEntry';
import Modal from '../modal/modal'; 

function Status() {
    const [modalInfo, setModalInfo] = useState({
        isOpen: false,
        name: '',
        type: ''
    });
    const [formData, setFormData] = useState({
        sectionName: '',
        budget: '',
        startDate: '',
        frequency: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
    
        // Convert budget and frequency to numbers if they are supposed to be numeric
        if (name === 'budget' || name === 'frequency') {
            formattedValue = value ? Number(value) : '';
        }
    
        setFormData(prevState => ({
            ...prevState,
            [name]: formattedValue
        }));
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Final data being sent to the server:", formData);  // Log the final form data
        try {
            const response = await fetch('http://localhost:2525/entries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();  // Move this line outside the if statement to catch server messages on errors too
            if (!response.ok) {
                console.error("Server responded with an error:", result);
                throw new Error(result.message || 'Unknown error');
            }
            console.log("Server response:", result);
            closeModal();
            setFormData({ sectionName: '', budget: '', startDate: '', frequency: '' });
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };
    

    const openModal = (name, type) => {
        setModalInfo({ isOpen: true, name, type });
    };

    const closeModal = () => {
        setModalInfo({ ...modalInfo, isOpen: false });
        setFormData({ sectionName: '', budget: '', startDate: '', frequency: '' });
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
                        <form onSubmit={handleSubmit}>
                            <div className="status-modal-input-group">
                                <label htmlFor="sectionName">Section Name</label>
                                <input type="text" id="sectionName" name="sectionName" value={formData.sectionName} onChange={handleInputChange} />
                            </div>
                            <div className="status-modal-input-group">
                                <label htmlFor="budget">Budget</label>
                                <div className="input-with-symbol">
                                    <span>$</span>
                                    <input type="text" id="budget" name="budget" value={formData.budget} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="status-modal-input-group">
                                <label htmlFor="startdate">Start Date</label>
                                <input type="date" id="startdate" name="startdate" value={formData.startDate} onChange={handleInputChange} />
                            </div>
                            <div className="status-modal-input-group">
                                <label htmlFor="frequency">Frequency</label>
                                <input type="text" id="frequency" name="frequency" value={formData.frequency} onChange={handleInputChange} />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    ) : (
                        <p>Details content for {modalInfo.name}</p>
                    )}
                </div>
            </Modal>
        </div>
    );
}

export default Status;

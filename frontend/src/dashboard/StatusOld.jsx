import React, { useState } from 'react'; 
import './Status.css';
import DashEntry from './DashEntry';
import Modal from '../modal/modal'; 
import DatePicker from 'react-datepicker';
import './Date.css';
import 'react-datepicker/dist/react-datepicker.css';


function Status() {
    const [modalInfo, setModalInfo] = useState({
        isOpen: false,
        name: '',
        type: ''
    });
    const [formData, setFormData] = useState({
        sectionName: '',
        budget: '',
        startDate: new Date(),
        frequency: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Final data being sent to the server:", formData); 
        try {
            const response = await fetch('http://localhost:2525/entries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json(); 
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
        if (name === 'budget' || name === 'frequency') {
            formattedValue = Number(value);
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: formattedValue
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prevState => ({
            ...prevState,
            startDate: date 
        }));
    };

    return (
        <div id="status-outer-container">
            <div id="status-container">
                <div id="status-inner-container">
                    <h1>Dashboard</h1>
                    <p id="status-add-section" onClick={() => openModal('New Section', 'add')}>Add Section</p>
                    {['Takeout Food', 'Clothes', 'Grocery', 'Laundry'].map((name, index) => (
                        <DashEntry key={index} name={name} budget={['low', 'medium', 'high', 'low'][index]} openModal={() => openModal(name, 'details')} />
                    ))}
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
                                        <DatePicker
                                            id="startdate"
                                            name="startdate"
                                            selected={formData.startDate}
                                            onChange={handleDateChange}
                                            dateFormat="MM/dd/yyyy"
                                            popperPlacement="bottom-start"
                                        />

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
            </div>
        </div>
    );
}


export default Status;

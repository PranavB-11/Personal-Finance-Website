import React, { useState } from 'react'; 
import './Status.css';
import DashEntry from './DashEntry';
import Modal from '../modal/modal'; 


function Status() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div id="status-outer-container">
            <div id="status-container">
                <div id="status-inner-container">
                    <h1>Dashboard</h1>
                    <p id="status-add-section" onClick={toggleModal}>Add Section</p>
                    <DashEntry name={"Takeout Food"} budget={"low"}/>
                    <DashEntry name={"Clothes"} budget={"medium"}/>
                    <DashEntry name={"Grocery"} budget={"high"}/>
                    <DashEntry name={"Laundry"} budget={"low"}/>
                </div>
            </div>


            
            <Modal isOpen={isModalOpen} onClose={toggleModal}>
                <div className="status-modal-content">
                    <h2>Add a New Section</h2>
                    
                    <div className="status-modal-input-group">
                        <label htmlFor="sectionName">Section Name</label>
                        <input type="text" id="sectionName" name="sectionName" />
                    </div>

                    <div className="status-modal-input-group">
                        <label htmlFor="amount">Amount</label>
                        <div className="input-with-symbol">
                            <span>$</span>
                            <input type="text" id="amount" name="amount" />
                        </div>
                    </div>
                    <div className="status-modal-input-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description"></textarea>
                    </div>
                </div>
            </Modal>


        </div>
    )
}

export default Status;

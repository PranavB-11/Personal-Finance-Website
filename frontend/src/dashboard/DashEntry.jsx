import React, { useState } from 'react';
import './DashEntry.css';

import { MdDelete } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoIosAddCircleOutline, IoMdOpen } from "react-icons/io";
import Modal from "../modal/modal"; // Make sure the import path is correct

function DashEntry({ name, budget }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeButton, setActiveButton] = useState('');  // Tracks which button was clicked

    // Function to open the modal with specific button context
    const openModal = (button) => {
        setIsModalOpen(true);
        setActiveButton(button);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setActiveButton(''); // Reset the active button state
    };

    const budget_class = {
        "low": "dash-entry-budget-low",
        "medium": "dash-entry-budget-medium",
        "high": "dash-entry-budget-high",
    };

    return (
        <div className="dash-entry" class={budget_class[budget]}>
            <div className="dash-entry-header">
                <h2>{name}</h2>
                <div className="dash-entry-options">
                    <button className="dash-entry-icon-button" onClick={() => openModal('add')}>
                        <IoIosAddCircleOutline size={30} />
                    </button>
                    <button className="dash-entry-icon-button" onClick={() => openModal('settings')}>
                        <CiSettings size={30} />
                    </button>
                    <button className="dash-entry-icon-button" onClick={() => openModal('delete')}>
                        <MdDelete size={30} />
                    </button>
                    <button className="dash-entry-icon-button" onClick={() => openModal('open')}>
                        <IoMdOpen size={30} />
                    </button>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="modal-content">
                    <h2 className="modal-header">
                        {activeButton === 'add' ? `Add Item to ${name}` :
                        activeButton === 'settings' ? `${name} Settings` :
                        activeButton === 'delete' ? `Are you sure you want to delete ${name}?` :
                        activeButton === 'open' ? `Opening details for ${name}` :
                        'Modal Content'}
                    </h2>
                    {activeButton === 'add' && (
                        <div className="modal-form">
                            <div className="form-group">
                                <label htmlFor="item-name">Name:</label>
                                <input type="text" id="item-name" name="item-name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="item-amount">Amount:</label>
                                <input type="text" id="item-amount" name="item-amount" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="item-date">Date:</label>
                                <input type="date" id="item-date" name="item-date" />
                            </div>
                            <button className="add-button">Add</button>
                        </div>
                        
                    )}
                </div>
            </Modal>
        </div>
    );
}

export default DashEntry;

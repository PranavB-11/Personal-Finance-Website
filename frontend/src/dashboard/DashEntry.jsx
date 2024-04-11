import React, { useState } from 'react';
import './DashEntry.css';

import { MdDelete } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoIosAddCircleOutline, IoMdOpen } from "react-icons/io";
import Modal from "../modal/modal"; // Ensure this path is correct

function DashEntry({ name, budget }) {
    // State to control if the modal is open
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const budget_class = {
        "low": "dash-entry-budget-low",
        "medium": "dash-entry-budget-medium",
        "high": "dash-entry-budget-high",
    };

    return (
        <div id="dash-entry" className={budget_class[budget]}>
            <h2>{name}</h2>
            <div id="dash-entry-options">
                <div className="dash-entry-options">
                    <button className="dash-entry-icon-button" onClick={openModal}>
                        <IoIosAddCircleOutline size={30} />
                    </button>
                    <button className="dash-entry-icon-button" onClick={openModal}>
                        <CiSettings size={30} />
                    </button>
                    <button className="dash-entry-icon-button" onClick={openModal}>
                        <MdDelete size={30} />
                    </button>
                    <button className="dash-entry-icon-button" onClick={openModal}>
                        <IoMdOpen size={30} />
                    </button>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <p>Modal Content</p>
            </Modal>
        </div>
    );
}

export default DashEntry;

import { useState } from 'react'

// Icons
import { MdDelete } from "react-icons/md"
import { CiSettings } from "react-icons/ci"
import { IoIosAddCircleOutline, IoMdOpen } from "react-icons/io"

import './DashEntry.css'
import Modal from '../modal/modal.jsx'

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

function DashEntry({ name }) {
    // Budget color
    const budget_class = "dash-entry-budget-low"
    const outerDivClassName = `dash-entry ${budget_class}`

    // Modals
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState('')
    const openModal = (type) => {
        setIsModalOpen(true)
        setModalType(type)
    }
    const closeModal = () => {
        setIsModalOpen(false)
        setModalType('')
    }

    const addItem = async () => {
        // Authentication details
        const username = getCookie('username')
        const password = getCookie('password')

        const section = name
        const itemName = document.getElementById('add-item-name').value
        const cost = document.getElementById('add-item-amount').value
        const date = document.getElementById('add-item-date').value

        // Add item to database
        const data = {
            username, password, section,
            'name': itemName, cost, date
        }
        const response = await fetch('http://localhost:3000/purchase', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const responseData = await response.json()
        console.log(responseData)
    }

    // Delete section
    const section_delete = async () => {
        const cookieUsername = getCookie('username')
        const cookiePassword = getCookie('password')

        console.log(cookiePassword, cookieUsername)

        // Delete section
        const response = await fetch('http://localhost:3000/section', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                'username': cookieUsername, 
                'password': cookiePassword,
                'section': name,
            })
        })
        const responseData = await response.json()

        if (responseData.success) {
            location.reload()
        }
    }

    return (
        <div className={outerDivClassName}>
            <div className="dash-entry-header">
                <h2>{name}</h2>
                <div className="dash-entry-options">
                    <button className="dash-entry-icon-button" onClick={() => openModal('add')}>
                        <IoIosAddCircleOutline size={30} />
                    </button>
                    <button className="dash-entry-icon-button" onClick={() => openModal('settings')}>
                        <CiSettings size={30} />
                    </button>
                    <button className="dash-entry-icon-button" onClick={section_delete} >
                        <MdDelete size={30} />
                    </button>
                    <button className="dash-entry-icon-button" onClick={() => openModal('open')}>
                        <IoMdOpen size={30} />
                    </button>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="modal-header">
                    {modalType === 'add' ? `${name}: Add Item` :
                    modalType === 'settings' ? `${name}: Settings` :
                    modalType === 'open' ? `${name}: All Items` :
                    'Modal Content'}
                </h2>
                {modalType === 'add' && (
                    <div className='modal-form'>
                        <div className="form-group">
                            <label htmlFor="item-name">Name:</label>
                            <input type="text" id="add-item-name" name="item-name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="item-amount">Amount:</label>
                            <input type="text" id="add-item-amount" name="item-amount" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="item-date">Date:</label>
                            <input type="date" id="add-item-date" name="item-date" />
                        </div>
                        <button className="add-button" onClick={addItem}>Add</button>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default DashEntry
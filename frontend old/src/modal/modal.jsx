import React from 'react';
import './modal.css';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="backdrop" onClick={onClose}>
            <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
                <div className="modal">
                    <button className="modal-close-button" onClick={onClose}>X</button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;

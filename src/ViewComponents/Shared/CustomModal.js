import React from 'react'
import Modal from '@material-ui/core/Modal';

export default function CustomModal({ open, closeModal, body }) {
    return (
        <div>
            <Modal
                className="modal"
                open={open}
                onClose={closeModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

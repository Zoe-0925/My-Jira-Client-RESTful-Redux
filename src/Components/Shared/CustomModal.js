import React from 'react'
import { Modal, DialogContent } from '@material-ui/core';


export default function CustomModal({ open, closeModal, ...props }) {
    return (
        <div>
            <Modal
                className="modal"
                open={open}
                onClose={closeModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <DialogContent>
                    {props.children}
                </DialogContent>
            </Modal>
        </div>
    );
}

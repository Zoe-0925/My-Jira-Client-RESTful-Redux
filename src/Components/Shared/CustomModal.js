import React from 'react'
import { Modal, DialogContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {Row} from "reactstrap"


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
                    <Row>
                        <CloseIcon onClick={closeModal}/>
                    </Row>
                    {props.children}
                </DialogContent>
            </Modal>
        </div>
    );
}

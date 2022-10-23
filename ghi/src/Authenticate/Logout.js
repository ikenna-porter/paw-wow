import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Logout(props) {
    const show = props.show;
    const handleClose = props.handleClose;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const logout = await fetch(
            'http://localhost:8100/token',
            {
                method: 'DELETE',
                credentials: 'include',
                headers: {'accept': 'application/json'}
            }
        )
        if (logout.ok) {
            navigate("/")
        }
    }
    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <p>Are you sure you want to logout?</p>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Remain Logged in
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleClose}>
                        Logout
                    </Button>
                </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    )
}
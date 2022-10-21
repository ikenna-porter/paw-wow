import { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Logout() {

    const handleSubmit = async (e) => {
        e.preventDefault;

        const logout = await fetch(
            'http://localhost:8100/token',
            {
                method: 'DELETE',
                headers: {'accept': 'application/json'}
            }
        )
    }
    return(
        <></>
    )
}
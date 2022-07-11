import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react';

const ResidentInfo = ({ link }) => {
    const [resident, setResident] = useState({})
    useEffect(() => {
        axios.get(`${link}`)
            .then((res) => {

                setResident(res.data)
            })

    }, [])
    return (
        <div className='residentCard'>
            <img src={resident.image} alt="" />
            <div >
                <ul>
                    <li>Name: <span>{resident.name}</span></li>
                    <li>Status: <div className='status' style={{ background: resident.status === "Alive" ? "green" : resident.status === "Dead" ? "red" : "gray" }}> </div>
                    <span> {resident.status}</span></li>
                    <li>Location: <span>{resident.origin?.name}</span></li>
                    <li>Episodes: <span>{resident.episode?.length}</span></li>
                </ul>
            </div>

        </div>
    );
};

export default ResidentInfo;
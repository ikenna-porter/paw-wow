import { useState, useEffect } from 'react';
import VacctinationsModal from './VaccinationsModal';

export default function Vaccinations(props) {
    const profileId = localStorage.getItem('profileId')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ hasVaccines, setHasVaccines ] = useState(false);
    const [ vaccines, setVaccines ] = useState({
        distemper: false,
        parvo: false,
        adeno: false,
        rabies: false,
        other: ''
    });

    async function getVaccines() {
        const response = await fetch(
            `http://localhost:8100/api/vaccinations/${profileId}`,
            {credentials: 'include'}
        )
        console.log("vax response", response)
        if (response.ok) {
            const data = await response.json();
            console.log("vax data", data)
            if (Object.keys(data).length > 1) {
                setHasVaccines(true);
                setVaccines(data);
            }
        }
    } 

    useEffect(() => {
        getVaccines();
    }, []);

    return(
    <>
      <h4 className="title">Vaccination Records</h4>
      <VacctinationsModal
        show={show} 
        handleClose={handleClose} 
        getVaccines={getVaccines}
        hasVaccines={hasVaccines}
        vaccines={vaccines}
        setVaccines={setVaccines}
      />
      { hasVaccines
        ?
          <div>
            <button className="profile-btn" onClick={handleShow}>
              Update {props.dogName}'s Vaccinations'
            </button>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Distemper</th>
                    <th>Parvo</th>
                    <th>Adeno</th>
                    <th>Rabies</th>
                    <th>Other</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{String(vaccines.distemper)}</td>
                    <td>{String(vaccines.parvo)}</td>
                    <td>{String(vaccines.adeno)}</td>
                    <td>{String(vaccines.rabies)}</td>
                    <td>{String(vaccines.other)}</td>
                  </tr>
                </tbody>
              </table>
          </div>
          : 
          <div>
            <button className="profile-btn" onClick={handleShow}>
              Add {props.dogName}'s Vaccinations
            </button>
          </div>
      }  
    </>
  )
}
import { useState, useEffect } from 'react'

export default function Vaccinations() {
    const [ distemper, setDistemper ] = useState(false);
    const [ parvo, setParvo ] = useState(false);
    const [ adeno, setAdeno ] = useState(false);
    const [ rabies, setRabies ] = useState(false);
    const [ other, setOther ] = useState('');
    const profileId = 13

    useEffect(() => {
        async function getVaccines() {
            const response = await fetch(`http://localhost:8100/api/vaccinations/${profileId}`)
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setDistemper(data.distemper);
                setParvo(data.parvo);
                setAdeno(data.adeno);
                setRabies(data.rabies);
                setOther(data.other)
            }
        } 
        getVaccines();   
    }, [])
     console.log("distemper", distemper)
    return(
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
                    <td>{String(distemper)}</td>
                    <td>{String(parvo)}</td>
                    <td>{String(adeno)}</td>
                    <td>{String(rabies)}</td>
                    <td>{String(other)}</td>
                </tr>
            </tbody>
        </table>
    )
}
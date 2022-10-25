export default function Characteristics(props) {
    const rateForEnergy = {
        1: "I am a couch potato",
        2: "I am pretry chill",
        3: "I can go for some play",
        4: "I love to run and play",
        5: "I have infinite energy!"
    }
    const rateForOthers = {
        1: "They are not my favorite",
        2: "I am shy around them",
        3: "I do not have much experience with them",
        4: "I like them!",
        5: "I LOVE them!"
    }

    function rate(char, value) {
        if (char === "energy level") {
            return rateForEnergy[value]
        } else {
            return rateForOthers[value]
        }
    }

    return (
        <div> 
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Characteristic</th>
                        <th>Rating</th>
                        <th>How I feel</th>
                    </tr>
                </thead>    
                <tbody>
                    {props.chars.map(obj => {
                        return(
                            <tr key={obj.char}>
                                <td>{obj.char}</td>
                                <td>{obj.value}</td>
                                <td>{rate(obj.char, obj.value)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )   
}
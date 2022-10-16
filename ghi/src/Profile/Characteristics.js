import { Link } from 'react-router-dom';

export default function Characteristics(props) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Characteristics</h5>
                { props.hasChars
                    ? <>Show data</>
                    : <Link to="/profile/create-characteristics" className="btn btn-secondary">Let us know more about your pup</Link>
                }
            </div>
        </div> 
    )   
}
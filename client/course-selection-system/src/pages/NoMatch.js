import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const goBack = () => window.history.back();

const NoMatch = () => {
    return (
        <div className="d-flex align-items-center justify-content-center text-center" style={{height:"100vh"}}>
           <div>
                <h1 className="display-1">404</h1>
                <p className="lead">Page Not Found</p>
                <button onClick={goBack} className="btn btn-dark"  to="/"><FontAwesomeIcon className="mr-2" icon={faArrowLeft}/> Go Back </button>
           </div>
        </div>
    );
};

export default NoMatch;
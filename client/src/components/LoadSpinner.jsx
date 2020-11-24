import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadSpinner = () => {
    return(
        <div className="row justify-content-center m-5">
            <Spinner animation="border" variant="primary" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    );
};

export default LoadSpinner;
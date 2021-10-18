import React from 'react';

const Preloader = () => {
    return (
        <div className="col-md-10 d-flex justify-content-center align-items-center" style={{height: '70vh'}}>
            <div className='spinner'>
                <div class="spinner-grow text-success mr-3" role="status">
                </div>
                <div class="spinner-grow text-danger mr-3" role="status">
                </div>
                <div class="spinner-grow text-warning" role="status">
                </div>
                <div class="visually-hidden ml-4 text-dark font-weight-bold mt-3">Loading...</div>
            </div>
        </div>
    );
};

export default Preloader;
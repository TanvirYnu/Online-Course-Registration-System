import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './HomeBanner.css'

const HomeBanner = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            { !loggedInUser.username ?
                <div className="pt-5 welcome-section">
                    <div className='layer d-flex justify-content-center align-items-center'>
                        <div className='login-btn'>
                            <Link to="/login" className="btn font-weight-bold text-white btn-success px-5 py-3 font-weight-bold">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
                :
                <div className="welcome-section">
                    <div class="layer">
                        <h1 className="text-white text-center mt-3"> Hello {loggedInUser.name.toUpperCase()}</h1>
                    </div>
                </div>
            }
        </div>

    );
};

export default HomeBanner;
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import brandImg from '../../images/icon/school.png'
import Typical from 'react-typical'
import './Header.css'
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <div className="bg-dark">
            <>
                <nav class="container navbar navbar-light py-2">
                    <Link to='/' class="navbar-brand">
                        <div className='d-flex align-items-center'>
                            <img src={brandImg} alt='brand-img' />
                            <h4 className='ml-2 align-self-end text-white'>
                                <Typical
                                    steps={['Hi, there...', 1500, 'Creative School', 1500]}
                                    loop={Infinity}
                                    wrapper="b"
                                />
                            </h4>
                        </div>
                    </Link>
                    <div class="ml-auto d-md-block d-sm-block d-none">
                        <nav class="navbar navbar-dark bg-dark">

                            <div class="d-flex justify-content-center">
                                <div class="nav-item active">
                                    <Link class="nav-link text-white nav-custom" to='/'>Home <span class="sr-only">(current)</span></Link>
                                </div>
                                <div class="nav-item">
                                    <Link class="nav-link text-white nav-custom" to='/about'>About</Link>
                                </div>
                                <div class="nav-item">
                                    <Link class="nav-link text-white nav-custom" to='/contact'>Contact</Link>
                                </div>
                            </div>

                            {
                                loggedInUser.username &&
                                <div className='pb-3'>
                                    <p className="text-white ml-auto mr-3"></p>
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {loggedInUser.name}
                                        </button>
                                        <div class="dropdown-menu">
                                            <button class='btn' onClick={() => setLoggedInUser({})}>Logout</button>
                                            <Link to='/dashboard' class='btn'>Dashboard</Link>
                                        </div>
                                    </div>
                                </div>
                            }
                        </nav>
                    </div>
                </nav>
            </>
        </div>
    );
};

export default Header;
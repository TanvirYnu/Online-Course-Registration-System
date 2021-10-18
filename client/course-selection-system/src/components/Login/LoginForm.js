import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import { UserContext } from '../../App';
import Axios from 'axios'
import Preloader from '../Preloader/Preloader';

const LoginForm = () => {
    const { register, handleSubmit, errors } = useForm();
    const [LoggedInUser, setLoggedInUser] = useContext(UserContext)
    const [preloader, setPreloader] = useState(false)

    let history = useHistory();
    let { from } = { from: { pathname: "/dashboard" } };

    const isRedirect = (res) => {
        if (res) {
            history.replace(from)
        }
    }

    const onSubmit = data => {
        setPreloader(true)
        Axios.post('https://cms-as.herokuapp.com/login', data)
            .then(resData => {
                setLoggedInUser({
                    isSignedIn: true,
                    name: resData.data.data.name,
                    username: resData.data.data.username,
                    role: resData.data.data.role,
                    id: resData.data.data.id
                })
                swal('success!', 'login successful', 'success');
                setPreloader(false);
                isRedirect(true)
            })
            .catch(error => {
                swal('error', `${error}`, 'error');
                isRedirect(false);
                setPreloader(false);
            })
    }

    return (
        <div>
            {
                preloader ? <Preloader />
                    :
                    <div className='d-flex justify-content-center align-items-center mb-3 pb-1 mt-5'>
                        <div className='sign-in-form border border rounded px-5 py-5 bg-white'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div class="form-group">
                                    <label for="username">UserName</label>
                                    <input type="text" name='username' class="form-control" id="username" ref={register({ required: true })} />
                                    <small id="username" class="form-text text-danger">
                                        {errors.username && `* This field can't be empty`}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" name='password' class="form-control" id="password" ref={register({ required: true })} />
                                    <small id="password" class="form-text text-danger">
                                        {errors.password && `* This field can't be empty`}
                                    </small>
                                </div>
                                <div class="form-group form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">Forgot Password</label>
                                </div>
                                <button type="submit" class="btn btn-primary btn-block">Login</button>
                            </form>

                        </div>
                    </div>
            }
        </div>
    );
};

export default LoginForm;
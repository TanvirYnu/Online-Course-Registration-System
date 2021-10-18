import React from 'react';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Axios from 'axios'

const StudentRegister = () => {

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data, e) => {
        const { name, username, password } = data;

        Axios.post('https://cms-as.herokuapp.com/signup', { name, username, password, role: 'student' })
            .then(data => {
                if (data.data) {
                    swal('Success', 'New Student account created!', 'success')
                    e.target.reset();
                }
            })
            .catch(error => {
                swal('Bad Request', `${error}`, 'error');
            })
    };

    return (
        <div>
            <Header />
            <div className="row">
                <div className="col-md-2 pl-0">
                    <Sidebar />
                </div>
                <div className="col-md-10 mt-5">
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-6'>
                            <div className="card card-body">
                                <h1 className='text-dark font-weight-bold mb-3 mb-4'>Register New Student</h1>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <input type="text"
                                        className='form-control mb-3'
                                        name="name"
                                        placeholder="Enter Student Name"
                                        ref={register({ required: true })} />
                                    {errors.name && <p className='text-danger'>this is can't be blank</p>}
                                    <input type="text"
                                        className='form-control mb-3'
                                        name="username"
                                        placeholder="Enter Username"
                                        ref={register({ required: true })} />
                                    {errors.username && <p className='text-danger'>this is can't be blank</p>}
                                    <input type="text" className='form-control mb-3' name="password" placeholder="Enter Password" ref={register({ required: true })} />
                                    {errors.password && <p className='text-danger'>this is can't be blank</p>}
                                    <input type="submit" className='btn btn-block font-weight-bold btn-outline-primary' value="Submit" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentRegister;
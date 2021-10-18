import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import StudentSidebar from '../StudentSidebar/StudentSidebar';
import Axios from 'axios';

const StudentEditProfile = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data, e) => {
        const password = data.password;
        const conPass = data.conPass;
        const id = loggedInUser.id;
        console.log(id);

        if (password === conPass) {
            Axios.patch(`https://cms-as.herokuapp.com/user/${id}`,{ password }) 
                .then(data => {
                    if (data.data) {
                        swal('password change successfully!', 'success')
                        e.target.reset();
                    }
                })
                .catch(error => {
                    swal('Bad Request', 'Something went wrong', 'error');
                })
        } else {
            swal(`Your password and confirm password doesn't match`)
        }
    };

    return (
        <div>
            <Header />
            <div className="row">
                <div className="col-md-2 pl-0">
                    <StudentSidebar />
                </div>
                <div className="col-md-10 mt-5">
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-6'>
                            <div className="card card-body py-5">
                                <div className='border-bottom'>
                                <h1 className='text-dark font-weight-bold'>Edit Profile</h1>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <input type="text" className='form-control mb-4 mt-4' name="password" placeholder="Enter New Password" ref={register({ required: true })} />
                                    {errors.courseId && <p className='text-danger'>this is can't be blank</p>}
                                    <input type="text" className='form-control mb-4' name="conPass" placeholder="Confirm new password" ref={register({ required: true })} />
                                    {errors.courseName && <p className='text-danger'>this is can't be blank</p>}
                                    <input type="submit" className='btn btn-block font-weight-bold btn-outline-primary' value="Submit" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default StudentEditProfile;
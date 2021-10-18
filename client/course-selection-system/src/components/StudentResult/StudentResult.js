import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import swal from 'sweetalert';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import StudentSidebar from '../StudentSidebar/StudentSidebar';

const StudentResult = () => {
    const [loggedInUser] = useContext(UserContext)
    const [results, setResults] = useState([])
    const [preloader, setPreloader] = useState(false)
    const { username } = loggedInUser

    useEffect(() => {
        setPreloader(true)
        Axios.get(`https://cms-as.herokuapp.com/student/result?username=${username}`)
            .then(data => {
                setResults(data.data.data)
                setPreloader(false)
            })
            .catch(error => {
                swal('error', `${error}`, 'error')
                setPreloader(false)
            })
    }, [username])

    return (
        <div className='mb-5'>
            <Header />
            <div className="row">
                <div className="col-md-2 pl-0">
                    <StudentSidebar />
                </div>
                <div className="col-md-10 row d-flex justify-content-center">
                    {
                        preloader ? <Preloader />
                            :
                            <div className='col-md-8 mt-5'>
                                <div className='card card-body bg-white'>
                                    <table className='table border'>
                                        <thead>
                                            <tr className='text-center'>
                                                <th scope="col">Student Username</th>
                                                <th scope="col">Course Name</th>
                                                <th scope="col">Obtain Mark</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                results.map(result => {
                                                    return (
                                                        <>
                                                            <tr className='text-center'>
                                                                <th scope="row">{result.username}</th>
                                                                <th scope="row">{result.courseName}</th>
                                                                <th scope="row">{result.marks}</th>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default StudentResult;
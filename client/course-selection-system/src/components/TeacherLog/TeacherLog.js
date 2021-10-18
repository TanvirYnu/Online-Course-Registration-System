import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Teachers from '../Teachers/Teachers';
import Axios from 'axios';

const TeacherLog = () => {
    const [teachers, setTeachers] = useState([])

    useEffect(() => {
        Axios.get('https://cms-as.herokuapp.com/user/teacher')
            .then(data => {
                setTeachers(data.data.data)
            })
    }, [])

    const handleDelete = (id) => {
        Axios.delete(`https://cms-as.herokuapp.com/user/${id}`)
            .then(data => {
                if (data.data) {
                    swal('success', 'Teacher Deleted Successfully', 'success')
                    const remainTeacher = teachers.filter(student => student._id !== id)
                    setTeachers(remainTeacher)
                } else {
                    swal('error', 'Something went wrong', 'error')
                }
            })
    }

    const handleEdit = (id) => {

    }

    return (
        <div>
            <Header />
            <div className="row">
                <div className="col-md-2 pl-0">
                    <Sidebar />
                </div>
                <div className="col-md-10 ml-5 mt-5 row d-flex justify-content-center">
                    <div className='col-md-10 mt-5'>
                        <div className='card'>
                            <div className='card-body'>
                                <table class="table border">
                                    <thead>
                                        <tr className='text-center'>
                                            <th scope="col">Full Name</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            teachers.map(teacher =>
                                                <Teachers
                                                    teacher={teacher}
                                                    key={teacher._id}
                                                    handleDelete={handleDelete}
                                                    handleEdit={handleEdit}
                                                />
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherLog;
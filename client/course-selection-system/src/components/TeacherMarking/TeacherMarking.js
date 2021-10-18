import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import { useForm } from 'react-hook-form';
import TeacherSidebar from '../TeacherSidebar/TeacherSidebar';
import swal from 'sweetalert';
import Marking from './Marking';

const TeacherMarking = () => {
    const [loggedInUser] = useContext(UserContext)
    const [courses, setCourses] = useState([])
    const [enrolledStu, setEnrolledStu] = useState([])
    const { name } = loggedInUser;
    const [selectedCourse, setSelectedCourse] = useState([])
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        Axios.get(`https://cms-as.herokuapp.com/teacher/${name}`)
            .then(data => {
                setCourses(data.data.data)
            })
            .catch(error => {
                swal('error', `${error}`, 'error')
            })
    }, [name])

    const onSubmit = (data) => {
        Axios.get(`https://cms-as.herokuapp.com/course/EnrolledCourseInfo`)
            .then(resData => {
                setEnrolledStu(resData.data.data)
            })
            .catch(error => {
                swal('error', `${error}`, 'error')
            })
        setSelectedCourse(data)
    };

    return (
        <div>
            <Header />
            <div className="row d-flex">
                <div className="col-md-2 pl-0">
                    <TeacherSidebar />
                </div>
                <div className="col-md-10 row d-flex flex-column align-items-center">
                    <div className="col-md-5 mt-5">
                        <div className="card card-body bg-white">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <select
                                    class="form-control"
                                    name='selectedCourse'
                                    ref={register({ required: true })}
                                >
                                    {
                                        courses.map(course => {
                                            return (
                                                <>
                                                    <option>{course.courseName}</option>
                                                </>
                                            )
                                        })
                                    }
                                </select>
                                <input
                                    type='submit'
                                    value='Fetch Enrolled Student'
                                    className="btn btn-success mt-3 btn-block"
                                />
                            </form>
                        </div>
                    </div>
                    <div>
                        <div className='card card-body'>
                            <h5 className='lead font-weight-bold bg-success p-3 border rounded text-white text-center'>Student List</h5>
                            {
                                enrolledStu.map(student => <Marking student={student} selectedCourse={selectedCourse} />)
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TeacherMarking;
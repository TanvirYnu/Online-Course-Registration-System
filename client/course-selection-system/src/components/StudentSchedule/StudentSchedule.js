import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import swal from 'sweetalert';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import StudentSidebar from '../StudentSidebar/StudentSidebar';

const StudentSchedule = () => {
    const [loggedInUser] = useContext(UserContext)
    const [courses, setCourses] = useState([])
    const [preloader, setPreloader] = useState(false)

    console.log(courses)

    useEffect(() => {
        setPreloader(true)
        const { username } = loggedInUser;
        Axios.get(`https://cms-as.herokuapp.com/enrolledCourses?username=${username}`)
            .then(data => {
                setCourses(data.data.data[0].cart)
                setPreloader(false)
            })
            .catch(error => {
                swal('error', `${error}`, 'error')
                setPreloader(false)
            })
    }, [loggedInUser])

    console.log(courses);

    return (
        <div className='mb-5'>
            <Header />
            <div className="row">
                <div className="col-md-2 pl-0">
                    <StudentSidebar />
                </div>
                {
                    preloader ? <Preloader />
                        :
                        <div className="col-md-10 row d-flex justify-content-center">
                            {
                                courses.map(course => {
                                    return (
                                        <div className='col-md-3 mt-3'>
                                            <div className='card card-body bg-dark'>
                                                <p className='font-weight-bold text-white'>{course.courseName.toUpperCase()}</p>
                                                <p className='font-weight-bold text-white'>CREDIT: {course.courseCredit}</p>
                                                <p className='font-weight-bold text-white'>TEACHER: {course.courseTeacher.toUpperCase()}</p>
                                                <p className='font-weight-bold text-white'>CLASS: {course.classRoomNum.toUpperCase()}</p>
                                                <p className='font-weight-bold text-white'>DAY: {course.classDay.toUpperCase()}</p>
                                                <p className='font-weight-bold text-white'>TIME: {course.startTime} - {course.endTime}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default StudentSchedule;
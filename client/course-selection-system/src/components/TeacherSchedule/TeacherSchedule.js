import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import TeacherSidebar from '../TeacherSidebar/TeacherSidebar';
import Axios from 'axios'
import swal from 'sweetalert';
import Preloader from '../Preloader/Preloader';

const TeacherSchedule = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [courses, setCourses] = useState([]);
    const [preloader, setPreloader] = useState(false);

    console.log(courses)

    useEffect(() => {
        setPreloader(true)
        const { name } = loggedInUser;
        Axios.get(`https://cms-as.herokuapp.com/teacher/${name}`)
            .then(data => {
                setCourses(data.data.data);
                setPreloader(false);
            })
            .catch(error => {
                swal('error', `${error}`, 'error');
                setPreloader(false);
            })
    }, [])

    return (
        <div>
            <Header />
            <div className='row d-flex justify-content-between'>
                <div className='col-md-2 pl-0'>
                    <TeacherSidebar />
                </div>
                <div className='col-md-10 d-flex justify-content-center'>
                    {
                        preloader ? <Preloader />
                            :
                            <div className="col-md-10 row">
                                {
                                    courses.map(course => {
                                        return (
                                            <div className='col-md-4 mt-3'>
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
        </div>

    );
};

export default TeacherSchedule;
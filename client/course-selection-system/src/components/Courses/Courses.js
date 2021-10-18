import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import Course from '../Course/Course';
import useLocalStorageState from 'use-local-storage-state/dist';
import StudentSidebar from '../StudentSidebar/StudentSidebar';
import Header from '../Header/Header';
import swal from 'sweetalert';
import { UserContext } from '../../App';
import Axios from 'axios'
import Preloader from '../Preloader/Preloader';
import CourseCart from '../CourseCart/CourseCart';
import './Courses.css'


const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [cart, setCart] = useLocalStorageState('cart', []);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [preloader, setPreloader] = useState(true)

    useEffect(() => {
        Axios.get('https://cms-as.herokuapp.com/course')
            .then(data => {
                setCourses(data.data.data)
                setPreloader(false)
            })
    }, [])

    //add item to cart
    const addToCart = (course) => {
        const isExisting = cart.find(item => item === course)
        if (isExisting) {
            swal('You have selected this course', 'Please Select another available course');
        } else {
            const newCart = [...cart, course];
            setCart(newCart);
        }
    }

    const handleEnroll = (course) => {
        const remainCourse = cart.filter(item => item !== course)
        setCart(remainCourse);
    }

    const handleConfirmBtn = () => {
        const username = loggedInUser.username;
        Axios.post('https://cms-as.herokuapp.com/enrolledCourse', { cart, username,  })
            .then(data => {
                if (data.data.success) {
                    swal('Well Done', 'you have been taken all this course', 'success')
                } else {
                    swal('error', 'something went wrong', 'error')
                }
            })
    }

    return (
        <div className="shop-container">
            <Header />
            <div className="row d-flex justify-content-between">
                <div className="col-md-2 pl-0">
                    <StudentSidebar />
                </div>
                {
                    preloader ? <Preloader />
                        :
                        <>
                            <div className="col-md-6 row course-area border-right border-top pt-3 courses-container">
                                {courses.map(course => <Course course={course} key={course.id} addToCart={addToCart}></Course>)}
                            </div>

                            <div className="col-md-3 cart-area pt-4 cart-container border-top">
                                <h3 className="text-center">Course Enrolled: {cart.length}</h3>
                                <ul className="list-group">
                                    {cart.map(course => <CourseCart course={course} handleEnroll={handleEnroll} />)}
                                </ul>
                                <button onClick={handleConfirmBtn} type="button" className="btn btn-success btn-block mb-5">
                                    Confirm
                                </button>
                            </div>
                        </>
                }

            </div>
        </div>
    );
};

export default Courses;
import React from 'react';
import './Course.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const Course = ({ course, addToCart }) => {
    return (
        <div className="col-md-6">
            <div className="single-item text-center my-3">
                <div className="card">
                    {course.img ?
                        <img className="card-img-top" style={{ height: "200px" }} src={course.img} alt="" />
                        : <img className="card-img-top" style={{ height: "200px" }} src='https://fakeimg.pl/300/' alt="" />
                    }
                    <div className="card-body">
                        <h5 className="card-title">{course.courseName}</h5>
                        <h6>Credits: {course.courseCredit.toUpperCase()}</h6>
                        <h6>Instructor: {course.courseTeacher}</h6>
                        <button className="btn btn-sm btn-success"
                            onClick={() => addToCart(course)}><FontAwesomeIcon icon={faPlusCircle} /> Enroll Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './CourseCart.css'

const CourseCart = ({ course, handleEnroll }) => {

    return (
        <div>
            <li className="list-group-item d-flex my-2 shadow justify-content-center bg-dark text-white border rounded">
                <span>
                    {course.courseName.toUpperCase()}
                    <button onClick={() => handleEnroll(course)} className="btn btn-danger ml-3">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </span>
            </li>
        </div>
    );
};

export default CourseCart;
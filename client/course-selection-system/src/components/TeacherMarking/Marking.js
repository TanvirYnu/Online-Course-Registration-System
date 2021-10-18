import Axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';

const Marking = ({ student, selectedCourse }) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        const courseName = selectedCourse.selectedCourse;
        const { username } = student;
        const { marks } = data;
        Axios.post('https://cms-as.herokuapp.com/teacher/insertMarks', { courseName, username, marks })
            .then(data => {
                swal('success', `${data.data.message}`, 'success')
            })
            .catch(error => {
                swal('error', `${error}`, 'error')
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='d-flex'>
                    <input
                        type="text"
                        name="username"
                        defaultValue={student.username}
                        className="form-control mr-2 mb-2"
                        ref={register({ required: true })}
                    />
                    <input
                        type="text"
                        name="marks"
                        className="form-control mr-2 mb-2"
                        placeholder="Enter obtain marks"
                        ref={register({ required: true })}
                    />
                    <input
                        type="submit"
                        value="Submit"
                        className="btn btn-success mb-2"
                    />
                </div>
            </form>
        </>
    );
};

export default Marking;
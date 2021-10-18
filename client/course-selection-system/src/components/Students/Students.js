import React from 'react';

const Students = ({ student, handleDelete, handleEdit }) => {
    return (
        <>
            <tr className='text-center'>
                <th scope="row">{student.name}</th>
                <td>{student.username}</td>
                <td>
                    <button onClick={() => handleEdit(student._id)} className="btn btn-warning">
                        edit
                    </button>
                    <button onClick={() => handleDelete(student._id)} className="btn btn-danger ml-2">
                        delete
                    </button>
                </td>
            </tr>
        </>
    );
};

export default Students;
import React from 'react';
import { Link } from 'react-router-dom';

const TeacherSidebar = () => {
    return (
        <div className='bg-custom py-3' style={{ height: '100vh' }}>
            <ul className='pl-0'>
                <li className='border-bottom d-flex justify-content-start pl-3'>
                    <Link to='/dashboard/teacher/editProfile' className='text-decoration-none dashboard-link my-3'>
                        Edit Profile
                    </Link>
                </li>
                <li className='border-bottom d-flex justify-content-start pl-3'>
                    <Link to='/dashboard/teacher/schedule' className='text-decoration-none dashboard-link my-3'>
                        Schedule
                    </Link>
                </li>
                <li className='border-bottom d-flex justify-content-start pl-3'>
                    <Link to='/dashboard/teacher/marking' className='text-decoration-none dashboard-link my-3'>
                        Student Scoring
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default TeacherSidebar;
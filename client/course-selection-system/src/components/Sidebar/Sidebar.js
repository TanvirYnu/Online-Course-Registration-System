import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {

    return (
        <div className='bg-custom py-3' style={{ height: '100vh' }}>
            <ul className='pl-0'>
                <li className='border-bottom d-flex justify-content-start pl-3'>
                    <Link to='/dashboard/createCourse' className='text-decoration-none dashboard-link my-3'>
                        Create Course
                    </Link>
                </li>
                <li className='border-bottom d-flex justify-content-start pl-3'>
                    <Link to='/dashboard/admin/courses' className='text-decoration-none dashboard-link my-3'>
                        Show Courses
                    </Link>
                </li>
                <li className='border-bottom d-flex justify-content-start pl-3'>
                    <Link to='/dashboard/studentReg' className='text-decoration-none dashboard-link my-3'>
                        Student Registration
                    </Link>
                </li>
                <li className='border-bottom d-flex justify-content-start pl-3'>
                    <Link to='/dashboard/studentLog' className='text-decoration-none dashboard-link my-3'>
                        Student Logs
                    </Link>
                </li>
                <li className='border-bottom d-flex justify-content-start pl-3'>
                    <Link to='/dashboard/teacherReg' className='text-decoration-none dashboard-link my-3'>
                        Teacher Registration
                    </Link>
                </li>
                <li className='border-bottom d-flex justify-content-start pl-3'>
                    <Link to='/dashboard/teacherLog' className='text-decoration-none dashboard-link my-3'>
                        Teacher Logs
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
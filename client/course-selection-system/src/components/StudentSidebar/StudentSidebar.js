import React from 'react';
import { Link } from 'react-router-dom';

const StudentSidebar = () => {
    return (
        <div className='bg-custom py-3' style={{ height: '100vh' }}>
            <ul className='pl-0'>
                <li className='border-bottom d-flex justify-content-start pl-3'>
                    <Link to='/dashboard/student/editProfile' className='text-decoration-none dashboard-link my-3'>
                        Edit Profile
                    </Link>
                </li>
                <li className='border-bottom d-flex justify-content-start pl-3'>
                    <Link to='/dashboard/student/showCourse' className='text-decoration-none dashboard-link my-3'>
                        Select Courses
                    </Link>
                </li>
                <li className='border-bottom d-flex justify-content-start pl-3'>
                    <Link to='/dashboard/student/marking' className='text-decoration-none dashboard-link my-3'>
                        Result Inquiries
                    </Link>
                </li>
                <li className='border-bottom d-flex justify-content-start pl-3'>
                    <Link to='/dashboard/student/Schedule' className='text-decoration-none dashboard-link my-3'>
                        Show Schedule
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default StudentSidebar;
import React, { useContext } from 'react';
import { UserContext } from '../../App';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import TeacherSidebar from '../../components/TeacherSidebar/TeacherSidebar';

const TeacherDashboard = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <div className='teacher-dashboard'>
            <Header />
            <div className='row d-flex justify-content-between'>
                <div className='col-md-2 pl-0'>
                    <TeacherSidebar />
                </div>
                <div className='col-md-8 mt-5'>
                    <p className=''>Logged in time: {new Date().toLocaleTimeString()} - {new Date().toLocaleDateString()}</p>
                    <h1 className='font-weight-bold d-inline-block border-bottom border-success'>
                        Welcome Teacher {loggedInUser.name.toUpperCase()}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
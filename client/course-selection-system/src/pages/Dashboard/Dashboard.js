import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import AdminDashboard from './AdminDashboard';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';

const Dashboard = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [isAdmin, setIsAdmin] = useState(false);
    const [isStudent, setIsStudent] = useState(true);
    const [isTeacher, setIsTeacher] = useState(false);

    useEffect(() => {
        if (loggedInUser.role === 'admin') {
            setIsAdmin(true)
            setIsTeacher(false)
            setIsStudent(false)
        } else if (loggedInUser.role === 'teacher') {
            setIsTeacher(true)
            setIsAdmin(false)
            setIsStudent(false)
        } else if (loggedInUser.role === 'student') {
            setIsStudent(true)
            setIsAdmin(false)
            setIsTeacher(false)
        }
    }, [])


    return (
        <>
            {isAdmin && <AdminDashboard />}
            {isTeacher && <TeacherDashboard />}
            {isStudent && <StudentDashboard />}

        </>
    );
};

export default Dashboard;
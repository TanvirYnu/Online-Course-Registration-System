import React from 'react';
import Header from '../../components/Header/Header';
import StudentSidebar from '../../components/StudentSidebar/StudentSidebar';

const StudentDashboard = () => {
    return (
        <div>
            <Header />
            <div className="row d-flex justify-content-between">
                <div className="col-md-2 pl-0">
                    <StudentSidebar />
                </div>
                <div className="col-md-8 mt-5">
                    Date: { new Date().toString() }
                </div>  
            </div>
        </div>
    );
};

export default StudentDashboard;
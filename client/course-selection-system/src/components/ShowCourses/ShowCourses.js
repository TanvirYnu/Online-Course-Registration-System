import { faEdit, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Axios from "axios";
import Preloader from "../Preloader/Preloader";

const ShowCourses = () => {
  const [courses, setCourses] = useState([]);
  const [preloader, setPreloader] = useState(true);

  useEffect(() => {
    Axios.get("https://cms-as.herokuapp.com/course").then((data) => {
      setCourses(data.data.data);
      setPreloader(false);
    });
  }, []);

  const deleteCourse = (id) => {
    Axios.delete(`https://cms-as.herokuapp.com/course/${id}`).then((data) => {
      if (data.data.success) {
        const restCourse = courses.filter((course) => course._id !== id);
        setCourses(restCourse);
        swal("success", `${data.data.message}`, "success");
      } else {
        swal("error", `something went wrong`, "error");
      }
    });
  };

  const editCourse = (id) => {};

  return (
    <div>
      <Header />
      <div className="row">
        <div className="col-md-2 pl-0">
          <Sidebar />
        </div>
        {preloader ? (
          <Preloader />
        ) : (
          <div className="col-md-10 mt-5">
            <div className="row">
              {courses.map((course) => {
                return (
                  <div className="col-md-4 py-3">
                    <div className="card">
                      {course.img ? (
                        <img
                          className="card-img-top"
                          style={{ height: "200px" }}
                          src={course.img}
                          alt=""
                        />
                      ) : (
                        <img
                          className="card-img-top"
                          style={{ height: "200px" }}
                          src="https://fakeimg.pl/300/"
                          alt=""
                        />
                      )}
                      <div className="card-body mx-auto text-center">
                        <h5 className="card-title">
                          {course.courseName.toUpperCase()}
                        </h5>
                        <h6>Credits: {course.courseCredit.toUpperCase()}</h6>
                        <h6>Teacher: {course.courseTeacher.toUpperCase()}</h6>
                        <h6>ClassRoom: {course.classRoomNum.toUpperCase()}</h6>
                        <h6>Course Day: {course.classDay.toUpperCase()}</h6>
                        <h6>
                          Course Time: {course.startTime} - {course.endTime}
                        </h6>
                        <button
                          className="btn btn-sm btn-success mr-3"
                          onClick={() => deleteCourse(course._id)}
                        >
                          <FontAwesomeIcon
                            className="mr-2"
                            icon={faMinusCircle}
                          />
                          Delete Course
                        </button>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => editCourse(course._id)}
                        >
                          <FontAwesomeIcon className="mr-2" icon={faEdit} />
                          Edit Course
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowCourses;

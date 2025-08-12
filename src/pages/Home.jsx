import React, { useEffect, useState } from "react";
import '../styles/home.css'
import { fetchData } from "../api/Data";
import { useNavigate, Navigate } from "react-router-dom";
import { isAuthenticated, getToken } from "../utils/Auth";
import Navbar from "../components/Navbar";

const Home = () => {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const user_id = getToken();

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        const response = await fetchData(`/user/${user_id}/courses/active`);
        console.log(response);

        setData(response.data);
    }

    const handleDetail = (id) => {
        navigate(`/course?course_id=${id}`);
    }

  return (
    isAuthenticated() ? (
        <>
        <Navbar/>
        {
            data && data.length > 0 ? (
                <div className="course-list" style={{
                    marginTop: '24px'
                }}>
                    {data.map((course, index) => (
                        <div key={index} className="course-item" onClick={() => handleDetail(course.course_id)}>
                            <img src={course.image} alt={course.title} className="course-image" />
                            <h2>{course.title}</h2>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '16px'
                            }}> 
                                <img src={course.instructors[0].photo} alt={course.instructors[0].name} className="instructor-avatar"/>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                    <h3>{course.instructors[0].name}</h3>
                                    <span>{course.instructor_role}</span>
                                </div>
                            </div>
                            <button className="btn">
                                Lanjut
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No courses available</p>
            )
        }
    </>
    ) : (
        <Navigate to={'/'}/>
    )
  );
}

export default Home;
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getToken } from "../utils/Auth";
import { fetchData } from "../api/Data";
import Navbar from "../components/Navbar";

const Detail = () => {
    const [data, setData] = useState({});
    const [chapters, setChapters] = useState({});
    const [currentLesson, setCurrentLesson] = useState('');
    const [position, setPosition] = useState({
        chapter: 0,
        lesson: 0,
    });
    const [title, setTitle] = useState("");
    const [maxLesson, setMaxLesson] = useState(0);
    const [searchParams] = useSearchParams();
    const course_id = searchParams.get('course_id');
    const user_id = getToken();

    useEffect(() => {
        const fetch = async () => {
            const response = await fetchData(`/course?course_id=${course_id}&user_id=${user_id}`);
            console.log(response.data);

            setCurrentLesson(response.data.chapters[position.chapter]?.lessons[position.lesson]?.backup_link)
            setTitle(response.data.chapters[position.chapter]?.title + " - " + response.data.chapters[position.chapter]?.lessons[position.lesson]?.title)
            setMaxLesson(response.data.chapters[position.chapter].lessons.length);
            setChapters(response.data.chapters);
            setData(response.data);
        }

        fetch();
    }, []);

    useEffect(() => {
        if (chapters[position.chapter] && chapters[position.chapter].lessons) {
            console.log(position);
            setMaxLesson(chapters[position.chapter].lessons.length);
            setTitle(chapters[position.chapter]?.title + " - " + chapters[position.chapter].lessons[position.lesson].title)
            setCurrentLesson(chapters[position.chapter].lessons[position.lesson]?.backup_link || "");
        }
    }, [position, chapters])

    const handleNext = () => {
        if (position.lesson < maxLesson - 1) {
            setPosition((prev) => ({
                ...prev,
                lesson: position.lesson + 1
            }));
        } else {
            setPosition({
                chapter: position.chapter + 1,
                lesson: 0
            });
        }
    }

    const handlePrev = () => {
        if (position.lesson == 0) {
            setPosition({
                chapter: position.chapter - 1,
                lesson: chapters[position.chapter - 1].lessons.length - 1,
            })
        } else {
            setPosition((prev) => ({
                ...prev,
                lesson: position.lesson - 1
            }));
        }
    }

    return (
        <>
        <Navbar/>
        {
            data ? (
                <div className="detail-container" style={{
                    marginTop: '32px',
                    marginInline: '100px',
                }}>
                    <h3 style={{
                        color: 'white',
                        marginBottom: '16px'
                    }}>{title ? title : data.title}</h3>
                    <div style={{ position: "relative", paddingTop: "56.25%"}}>
                        <iframe
                            src={currentLesson ? currentLesson : null}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%"
                            }}
                        ></iframe>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '16px',
                        marginBottom: '32px'
                    }}>
                        {
                            position.chapter != 0 || position.lesson != 0 ? (
                                <button className="btn-detail" onClick={() => handlePrev()}>{'< '}Sebelumnya</button>
                            ) : (
                                <div style={{opacity:0}}></div>
                            )
                        }
                        {
                            position.chapter < chapters.length - 1 || position.lesson < maxLesson - 1 ? (
                                <button className="btn-detail" onClick={() => handleNext()}>Selanjutnya {' >'}</button>
                            ) : (
                                <div style={{opacity:0}}></div>
                            )
                        }
                    </div>
                </div>
            ) : (
                "Tidak ada data"
            )
        }
        </>
    );
}

export default Detail;
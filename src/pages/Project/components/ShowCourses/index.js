import React from 'react'
import './style.scss'
import { useDispatch } from 'react-redux';
import { getMyCourses } from '../../../../_actions/userAction';
import { useEffect } from 'react';

function ShowCourses({ closeModal, onSubmit}) {
    const [ courses, setCourses ] = React.useState([]);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMyCourses()).then(res => {
            const { data } = res.payload;
            setCourses(data)
        })
    }, [])
    
    return (
        <div className="show__courses" tabIndex="-1">
            <div className="modal__wrapper--show">
                    <div className="wrapper__header">
                        <p>제출한 과제 및 과목 선택하세요</p>
                        <button className="close" onClick={()=>{closeModal(false)}}>x</button>
                    </div>
                    <div className="wrapper__body">
                        <ul>
                            {
                                courses.length !== 0 ?
                                <>
                                    {
                                        courses.map((item, idx) => 
                                        <li key ={idx} onClick={() => onSubmit(
                                            item.courseid, item.assignid
                                        )}>{idx}. {item.name} - <b>{item.fullname}</b></li>
                                        )
                                    }
                                </> : ""
                            }
                        </ul>
                    </div>
            </div>
        </div>
    )
}


export default ShowCourses
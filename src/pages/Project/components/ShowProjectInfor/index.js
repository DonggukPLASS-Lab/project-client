import React, { useState } from 'react'
import './style.scss'
import { useDispatch } from 'react-redux';
// import { getMyCourses } from '../../../../_actions/userAction';
import { useEffect } from 'react';
import projectAPI from '../../../../apis/projectAPI';


function ShowProjectInfor({ closeModal, project, handleProject}) {

    const [handleChange, setHandleChange] = useState(false);
    const [projectName, setProjectName] = useState(project.name);
    const [projectLanguage, setProjectLanguage] = useState(project.language);
    const [projectUsage, setProjectUsage] = useState(project.project_usage);
    const [projectCategory, setProjectCategory] = useState(project.category);
    const [ tempTag, setTempTag] = useState("");
    const [ tags, setTags] = useState(project.tag.length !== 0 ? project.tag.split(",") : []);




    const handleSubmit = async () => {
        try {
            const paramsModifyProject = { 
                id: project.id,
                name: projectName, 
                language: projectLanguage,
                usage: projectUsage,
                category: projectCategory,
                tags: tags
            }
            const response = await projectAPI.modifyProject(paramsModifyProject)
            const { data } = response;
            const params = {
                project: data
            }
            handleProject(params);
        } catch (error) {
            console.log(error)
            alert("프로젝트 수정 실패합니다. 다시 시도해주세요")
        }
    }
    const [addButton, setAddButton] = React.useState(false);
    
    const removeTag = (idx) => {
        const lisTags = [...tags];
        lisTags.splice(idx, 1);
        setTags(lisTags);
    }
    // const styleAdd = addButton ? {
    //     display: 'block'
    // } : { display: 'none'}

    const setTag = () => {
        if(tags.length === 5){
            alert("태그 최대 5번까지 입력 가능합니다.")
        }else{
            setTags([...tags, tempTag]);  
        }
        setTempTag("");
    }
    return (
        <div className="show-project" tabIndex="-1">
            <div className="modal__wrapper--show">
                    <div className="wrapper__header">
                        <p>프로젝트 정보</p>
                        <button className="close" onClick={()=>{closeModal(false)}}>x</button>
                    </div>
                    <div className="wrapper__body project-info">
                        <div className="project-info__name">
                            <span>이름</span>
                            <input type="text" value={projectName}  onChange={(e) => {
                                setProjectName(e.target.value)
                                setHandleChange(true)
                            }}/>
                        </div>

                        <div className="project-info__language">
                            <span>언어</span>
                            <select name="" id="" value={projectLanguage} onChange={(e) => {
                                setProjectLanguage(e.target.value)  
                                setHandleChange(true)}}>
                                <option value="c">C</option>
                                <option value="cpp">C++</option>
                                <option value="java">Java</option>
                                <option value="python">Python</option>
                            </select>
                        </div>
                        <div className="project-info__usage">
                            <span>분야</span>
                            <select name="" id="" value={projectUsage} onChange={(e) => {
                                setProjectUsage(e.target.value)
                                setHandleChange(true)}}>
                                <option value="기초 프로그래밍">기초 프로그래밍</option>
                                <option value="심화 프로그래밍">심화 프로그래밍</option>
                                <option value="인공지능프로그래밍기초와실습">인공지능프로그래밍기초와실습</option>
                                <option value="프로그래밍기초와실습">프로그래밍기초와실습</option>
                                {/* <option value="기초 프로그래밍">기초 프로그래밍</option>
                                <option value="객체지향 프로그래밍">객체지향 프로그래밍</option>
                                <option value="심화 프로그래밍">심화 프로그래밍</option>
                                <option value="Python">이공계열을 위한 Python과 AI 기초</option> */}
                            </select>
                        </div>
                        <div className="project-info__category">
                            <span>용도</span>
                            <select name="" id="" value={projectCategory} onChange={(e) => {
                                setProjectCategory(e.target.value)
                                setHandleChange(true)}}>
                                <option value="자료구조 학습용">자료구조 학습용</option>
                                <option value="알고리즘 학습용">알고리즘 학습용</option>
                                <option value="과제 학습용">과제 학습용</option>
                                <option value="기타 학습용">기타 학습용</option>
                            </select>
                        </div>
                        <div className="project-info__tag">
                            <span>태그</span>
                            <div className="input_left">
                                <div>
                                    <input type="text" name="tag" id="project_tag" placeholder="태그를 입력하고 Enter 혹은 추가 버튼을 눌러주세요.(1개씩 최대 5번까지 가능)" value={tempTag} 
                                        onChange = {(e) => {setHandleChange(true); setTempTag(e.target.value)}}
                                        onKeyPress={event => {
                                                if (event.key === 'Enter') {
                                                    if(tags.length === 5){
                                                        alert("태그 최대 5번까지 입력 가능합니다.")
                                                    }else{
                                                        setTags([...tags, tempTag]);  
                                                    }
                                                    setTempTag("");
                                                }
                                            }}
                                        onBeforeInput = {() => setAddButton(true)}
                                        // onBlur = {() => setAddButton(false)}
                                    />
                                </div>
                                {
                                    addButton ? <button onClick={() => setTag()}> 추가 </button>  : ""
                                }
                                {
                                    tags.length !== 0 ? 
                                    <div className="list__tags">
                                        {
                                            tags.map((item, idx) => 
                                                <button key={idx}>{item}<span style={{cursor: "pointer"}} onClick={() => { removeTag(idx); setHandleChange(true) }}>x</span></button> 
                                            )
                                        }
                                    </div> :
                                    ""
                                }
                            </div>
                        </div>
                    </div>
                    {
                        handleChange &&
                        <div className="wrapper__btn">
                            <button onClick={handleSubmit}>저장</button>
                        </div>
                    }
            </div>
        </div>
    )
}

export default ShowProjectInfor;


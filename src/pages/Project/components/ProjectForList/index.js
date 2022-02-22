import React from 'react'
import './style.scss'
import { useState } from 'react';
// import projectAPI from '../../../../apis/projectAPI';
// import ShowCourses from '../ShowCourses'
// import ShowProjectInfor from '../ShowProjectInfor'
// import { useOutsideAlerter } from '../../../../hooks/outsideAlerter';
import ProjectActions from '../ProjectActions';

function getImageUrl(language){
    let url;
    switch (language) {
        case "c":
            url = `https://www.pngkit.com/png/full/101-1010012_c-programming-icon-c-programming-language-logo.png`;
            break;
        case "cpp":
            url = `https://user-images.githubusercontent.com/42747200/46140125-da084900-c26d-11e8-8ea7-c45ae6306309.png`;
            break;
        case "java":
            url = `https://images.vexels.com/media/users/3/166401/isolated/preview/b82aa7ac3f736dd78570dd3fa3fa9e24-java-programming-language-icon-by-vexels.png`;
            break;
        case "python": 
            url = `https://www.freepngimg.com/download/android/72537-icons-python-programming-computer-social-tutorial.png`;
            break;
        case "r":
            url = `https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/R_logo.svg/724px-R_logo.svg.png`;
            break;
        default: 
            url = ``;
            break;
    }
    return url;
} 

function ProjectForList({project, handleDelete}) {

    const [currentProject, setCurrentProject] = useState(project);

    const handleDeleteProject = async params => {
        handleDelete(params)
    }

    const handleModifyProject = async (project) => {
        setCurrentProject(project)
    }

    const onClickProject = async () => {
        try{
            const containerAPI = localStorage.getItem("redirect_token");
            window.open(`${process.env.REACT_APP_CODE_SERVER}/${containerAPI}?folder=/home/coder/projects/${project.name}`, '_blank');
        }catch(error){
            alert('Vs-code 서버 연결 오류 발생했으니 다시 시도 해주세요.')
            console.log(error)
        }
    }


    return (
        <article className="project-for-list">
            <div className="project-for-list__title">
                <img onDoubleClick={() => onClickProject(currentProject.id)} src = { getImageUrl(currentProject.language) } alt="img by project category"/>
                <span onDoubleClick={() => onClickProject(currentProject.id)} >{currentProject.name}</span>
            </div>
            <div className="project-for-list__info">
                <span className="project-for-list__info--date">날짜 : {currentProject.created.substring(0,10)}</span>
                <ProjectActions 
                    type="list"
                    project={currentProject}
                    handleModifyProject={handleModifyProject}
                    handleDeleteProject={handleDeleteProject}
                />
            </div>
        </article>
    )
}

export default ProjectForList


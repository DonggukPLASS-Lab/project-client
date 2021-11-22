import React, { useState } from 'react'
import projectAPI from '../../../../apis/projectAPI';
import ShowCourses from '../ShowCourses';
import ShowProjectInfor from '../ShowProjectInfor';
import styled from 'styled-components';
import { useOutsideAlerter } from '../../../../hooks/outsideAlerter';

function ProjectActions({project : propProject, type, handleDeleteProject : propHandleDeleteProject , handleModifyProject}) {

    // const [showCourses, setShowCourses] = useState(false);
    const [showProjectInfor, setShowProjectInfor] = useState(false);
    const [project, setProject] = useState(propProject);

    const handleDownload = async (id) => {
        try{
            const params = {
                projectId: id
            }
            const response = await projectAPI.downloadProject(params);
            const { data } = response;
            const { path } = data[0];
            const link = document.createElement('a');
            link.href = `${process.env.REACT_APP_SERVER_API}/${path}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        }catch(error){
            alert('서버 연결 오류 발생했으니 다시 시도 해주세요. 프로젝트 다운로드 실패합니다.')
            console.log(error)
        }
    }
    // const handleSubmitHw = async (assignid) => {
    //     try {
    //         const params = {
    //             projectId: project.id,
    //             assignid: assignid
    //         }
    //         const response = await projectAPI.submitHomework(params);
    //         const { message } = response;
    //         alert(message);
    //         setShowCourses(false)
    //     } catch (error) {
    //         alert(error)
    //         alert("서버 접근 오류 발생합니다. 다시 시도해주세요")            
    //     }
    // }
    const handleDeleteProject = async id => {
        const confirm = window.confirm("프로젝트 삭제하시겠습니까?"); 
        if(confirm === true){
            try {
                const params = {
                    projectId: id,
                }
                await projectAPI.deleteProject(params);
                propHandleDeleteProject(params)
            } catch (error) {
                console.log(error)
                alert("프로젝트 삭제에 실패했습니다.")
            }
        }
    }

    const handleProject = (params) => {
        const { project } = params;
        setProject(project)
        setShowProjectInfor(!showProjectInfor);
        handleModifyProject(project)
    }

    const { visible, setVisible, ref } = useOutsideAlerter(false);
    // const { visible, setVisible} = useState(false);
    // const [tempVisible, setTempVisible] = useState(false);
    const handleViewTask = () => {
        // console.log(visible)
        setVisible((prevState) =>  !prevState)
    }
    const styleOpacity = {
        position: 'absolute',
        display: 'block'
    } 

    return (
    <WrapperProjectAction>
        <div className={`project-for-${type}__info--task`} onClick={() => handleViewTask() }>
            {
                visible ? <i className="fa fa-times"  /> : <i className="fa fa-ellipsis-v" />
            }
            {
                visible && 
                    <>
                    <div className={`project-for-${type}__info--task--hwk`} ref={ref}  style={styleOpacity}>
                        <ul>
                            {/* <li onClick={() => setShowCourses(true)}>과제 제출</li> */}
                            <li onClick={() => setShowProjectInfor(!showProjectInfor)}>프로젝트 정보</li>
                            <li onClick={() => handleDeleteProject(project.id)}>프로젝트 삭제</li>
                            <li onClick={() => handleDownload(project.id)}>다운로드</li>
                        </ul>
                    </div>
                    </>
                }
        </div>
        {
            showProjectInfor &&
                <ShowProjectInfor 
                    project = {project}
                    closeModal = {() => setShowProjectInfor(false)}
                    handleProject = {handleProject}
                />
        }
    </WrapperProjectAction>
    )
}
const WrapperProjectAction = styled.div`
    .project-for-grid__info--task{
        cursor: pointer;
        position: relative;
        &--hwk{
            border: 1px solid #999;
            transition: 0.1s all;
            color: rgb(153, 153, 153);
            font-size: 14px;
            z-index: 10;
            cursor: pointer;
            color: rgb(153, 153, 153);
            font-size: 14px;
            padding: 10px;
            width: 150px;
            background: #24282A;
            transform: translate(-60%, -50%);
            display: none;

            position: absolute;
            display: block;
            ul{
                li{
                    margin-bottom: 10px;
                    width: 100%;       
                    &:hover{
                        color: white;
                    }             
                }
            }
        }
    }
    .project-for-list__info--task{
        position: relative;
        cursor: pointer;
        
        &--hwk{
            text-align: left;
            background: #24282A;
            border: 1px solid #999;
            transition: 0.1s all;
            color: rgb(153, 153, 153);
            width: 150px;
            font-size: 14px;
            padding: 10px;
            z-index: 10;
            cursor: pointer;
            transform: translate(-65%, 40%);

            position: absolute;
            display: block;
            ul{
                li{
                    margin-bottom: 10px;
                    width: 100%;       
                    &:hover{
                        color: white;
                    }             
                }
            }
        }
    }
`

export default ProjectActions


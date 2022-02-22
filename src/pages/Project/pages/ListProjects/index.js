import React, { useEffect, useState } from 'react'
import './style.scss'
import ProjectForGrid from '../../components/ProjectForGrid'
import ProjectForList from '../../components/ProjectForList'
import styled from 'styled-components'
import CreateProjectModal from '../../components/CreateProjectModal'
import projectAPI from '../../../../apis/projectAPI'
import userAPI from '../../../../apis/userAPI'
import Select from 'react-select';
import WrapperLoading from '../../../../components/WrapperLoading'
import Container from '../../components/Container'
import MainLayout from '../../../../layouts/MainLayouts'
// import { useOutsideAlerter } from '../../../../hooks/outsideAlerter'
var moment = require('moment');

const sortOption = [
  { value: '이름', label: '이름' },
  { value: '날짜', label: '날짜' },
];

function ListProject(props) {

  //DATA
  const [myContainer, setMyContainer] = useState([])
  const [listProject, setListProject] = useState([])
  const [modal, setModal] = useState(false)

  //STATE
  const [loadStateContainer, setLoadStateContainer] = useState(false)
  const [selectedOption, setSelectOption] = useState(null)

  //VIEW STATE
  const [viewContainer, setViewContainer] = useState(true)
  const [viewProject, setViewProject] = useState(false)
  const [containerState, setContainerState] = useState(true)

  const [viewProjectTypeModal, setViewProjectTypeModal] = useState(false)
  const [viewProjectType, setProjectType] = useState("grid")



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await projectAPI.getALl();
        const responseContainer = await userAPI.getContainer();
        const { data } = responseContainer;
        const statusViewProject = data.length === 0 ? false : data[0].status
    
        const storeType = localStorage.getItem("type") ? localStorage.getItem("type") : viewProjectType;
  
        setProjectType(storeType);
        setListProject(response.data)
        setMyContainer(data)
        setViewProject(statusViewProject)
        if(data.length !== 0)
          setViewProject(data[0].status ? true : false)
      } catch (error) {
        alert("서버 연결 실패합니다")
        console.log(error)        
      }
    }
    fetchData();
  }, [])

  const handleSortProject = (selectedOption) => {
    setSelectOption({selectedOption});
    const option = selectedOption.value;
    switch (option) {
        case "이름":
            const listProjectTemp = [...listProject];
            listProjectTemp.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            })
            setListProject(listProjectTemp)
            // this.setState({
            //     listProject: listProjectTemp
            // })
            break;
        case "날짜":
            const listProjectTempDate = [...listProject];
            listProjectTempDate.sort(function (a, b) {
                var first = moment(a.created).format("YYYY-MM-DD");
                var second = moment(b.created).format("YYYY-MM-DD");
                return second - first;
            })
            setListProject(listProjectTempDate)
            break;
    }
  }

  const handleCreateContainer = async () => {
    setLoadStateContainer(true)    
    try {
        const containerAPI = localStorage.getItem("redirect_token");
        const params = {
            containerAPI
        }
        const response = await userAPI.createContainer(params);
        const { result } = response;
        if (result) {
            setTimeout(async () => {
                setViewContainer(true)
                setViewProject(true)
                setMyContainer(response.data)
                setLoadStateContainer(false)
            }, 1000);
        } else {
            setTimeout(async () => {
                setLoadStateContainer(false)
                alert("컨테이너 생성을 실패합니다. 다시 시도해주세요.")
            }, 1000);
        }
    } catch (error) {
        setTimeout(async () => {
            setLoadStateContainer(false)
            alert("컨테이너 생성을 실패합니다. 다시 시도해주세요.")
        }, 1000);
    }
  }

  const handleViewProjectsType = (type) => {
    localStorage.setItem("type", type)
    setProjectType(type)
    setViewProjectTypeModal(false)
  }

  const handleCreateProject = (data) => {
    const { result } = data;
    if(result){
      const { project } = data
      setListProject([...listProject, project])
    }
    setModal(false)
  }

  const handleDeleteProject = ({projectId}) => {
      const tempProjects = [...listProject]
      const filterProject = tempProjects.filter(element => element.id !== projectId)
      setListProject([])
      setListProject(filterProject)
  }

  const handleChangeContainerStatus = (status) => {
      const tempContainer = [...myContainer];
      tempContainer[0].status = status ? 1 : 0;
      setMyContainer(tempContainer)
  } 
  return (
    <MainLayout>
    <div className="projects">
      <div className="projects__wrapper">
        <div className="projects__wrapper--header">
          <div className="title">
            <h3>내 프로젝트</h3>
          </div>
          <div className="sort">
            <span>정렬</span>
            <Select
              defaultValue={sortOption[0]}
              onChange={handleSortProject}
              options={sortOption}
              className="sort-select"
              theme={theme => ({
                ...theme,
                colors: "black"
              })}
            />
          </div>
        </div>
        <div className="projects__wrapper--body">
          <p style={{ cursor: 'pointer', display: 'inline' }}
            onClick={() => setViewContainer(!viewContainer)}>내 컨테이너 <span>
              <i className={viewContainer ? "fa fa-chevron-down" : "fa fa-chevron-up"}></i></span>
          </p>
          {
            myContainer.length === 0 ?
              <div className="projects__wrapper--container">
                {
                  !loadStateContainer ?
                    <div className="printf__container">
                      <h4>현재 생성된 컨테이너가 없습니다</h4>
                      <div className="printf__container--button" onClick={() => handleCreateContainer()}>
                        <i className="fa fa-university"></i>
                        <i className="fa fa-plus-circle"></i>
                        <p>새 컨테이너 생성(0/1)</p>
                      </div>
                    </div> :
                    <div>
                      <p style={{ textAlign: 'center' }}>컨테이너 생성중니다. 잠깐만 기다려주세요...</p>
                      <WrapperLoading type={'bars'} color={'white'} />
                    </div>
                }
              </div>
              :
              <>
                <div className="projects__wrapper--listcontainer">
                  {
                    viewContainer ?
                      <Container
                        container={myContainer[0]}
                        handleChangeStatus={(status) => {
                          setViewProject(status)
                          setContainerState(status)
                          handleChangeContainerStatus(status)
                        }}
                      />
                      : ""
                  }
                </div>
                <div className="projects__wrapper--viewtype">
                  <p style={{ cursor: 'pointer', display: 'inline' }}
                    onClick={() => {
                      if (!myContainer[0].status) {
                        alert("프로젝트 들어가려면 먼저 컨테이너를 올리세요")
                      } else {
                        setViewProject(!viewProject)
                      }
                    }}
                  >내 프로젝트 <span><i className={viewProject ? "fa fa-chevron-down" : "fa fa-chevron-up"}></i></span></p>
                  <div className="project-viewtype"><i className={viewProjectType === 'grid' ? "fa fa-th-large" : "fa fa-th-list"} onClick={() => setViewProjectTypeModal(!viewProjectTypeModal)}></i>
                    {
                      viewProjectTypeModal &&
                      <div>
                        <div className={viewProjectType === 'grid' ? "current-type" : ""} onClick={() => handleViewProjectsType("grid")}><span>Grip View</span> <i className="fa fa-th-large"></i></div>
                        <div className={viewProjectType === 'list' ? "current-type" : ""} onClick={() => handleViewProjectsType("list")}><span>List View</span> <i className="fa fa-th-list"></i></div>
                      </div>
                    }
                  </div>
                </div>
                { //grid
                  viewProjectType === 'grid' &&
                  <div className="projects__wrapper--grid">
                    {
                      viewProject ?
                        <>
                          <CreateProject
                            openModal={() => setModal(true)}
                          />
                          {
                            listProject.map((item, idx) => {
                              return <ProjectForGrid
                                key={idx}
                                project={item}
                                handleDelete={handleDeleteProject}
                              />
                            })
                          }
                        </> : ""
                    }
                  </div>
                }
                {// list
                  viewProjectType === 'list' &&
                  <div  className={listProject.length > 7 ? "projects__wrapper--list multi" : "projects__wrapper--list"}>
                    {
                      viewProject ?
                        <>
                          <div className="create-btn">
                            <span onClick={() => setModal(true)}><i className="fa fa-plus"></i> &nbsp;프로젝트 생성</span>
                          </div>
                          <div>
                          {
                            listProject.map((item, idx) => {
                              return <ProjectForList
                                key={idx}
                                project={item}
                                handleDelete={handleDeleteProject}
                              />
                            })
                          }

                          </div>
                        </> : ""
                    }
                  </div>

                }
                {
                  modal &&
                  <CreateProjectModal
                    closeModal={() => setModal(false)}
                    handleCreateProject = {handleCreateProject}
                    // onSubmit={this.onSubmit}
                  />
                }
              </>
          }
        </div>
      </div>
    </div>
  </MainLayout>
  )
}


export default ListProject




function CreateProject({ openModal }) {
  return (<WapperCreateProject onClick={() => openModal()}>
    <button>
      <i className="fa fa-plus-circle"></i>
      <h4>프로젝트 생성</h4>
    </button>
  </WapperCreateProject>)
}

const WapperCreateProject = styled.div`
    border: 1px solid #999;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 230px;
    cursor: pointer;
    h4{
        margin-top: 10px;
        cursor: pointer; 
    }
    button{
        cursor: pointer;
        outline: none;
        border: none;
        color: #ccc;
        background: transparent;
        i{
            font-size: 40px;
            cursor: pointer;
        }
    }
    &:hover{
        button{
            color: #fff;
        }
        -webkit-box-shadow: 0px 0px 8px -1px rgba(255,255,255,1);
        -moz-box-shadow: 0px 0px 8px -1px rgba(255,255,255,1);
        box-shadow: 0px 0px 8px -1px rgba(255,255,255,1);
    }
`

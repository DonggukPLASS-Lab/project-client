import React from 'react'
import './style.scss'
import projectAPI from '../../../../apis/projectAPI';

function CreateProjectModal({ closeModal, handleCreateProject}) {

    const [ name, setName ] = React.useState("");
    const [ category, setCategory ] = React.useState("기초 프로그래밍");
    const [ language, setLanguage ] = React.useState("c");
    const [ usage, setUsage] = React.useState("자료구조 학습용")
    const [ tempTag, setTempTag] = React.useState("");
    const [ tags, setTags] = React.useState([]);


    const [addButton, setAddButton] = React.useState(false);
    
    const removeTag = (idx) => {
        const lisTags = [...tags];
        lisTags.splice(idx, 1);
        setTags(lisTags);
    }
    const styleAdd = addButton ? {
        opacity: '1'
    } : { opacity: '0'}

    const setTag = () => {
        if(tags.length === 5){
            alert("태그 최대 5번까지 입력 가능합니다.")
        }else{
            setTags([...tags, tempTag]);  
        }
        setTempTag("");
    }

    const handleSubmitProject = async () => {
        //name, language, category, tags, usage
        if (!name || !category || !language) {
            alert("입력값을 확인해주세요")
            return;
        }
        try {
            if(name.length >= 30)
            {
                alert("프로젝트 이름의 길이는 30자로 제한합니다. 다시 확인 해주세요.")
            }
            let project = { name, category, language, tags, usage }
            const response = await projectAPI.createProject(project);
            const { result, message, data } = response;
            let params = {
                result: false
            }
            if(result){
                params = {...params,
                    result: true,
                    project: data
                }
            }else{
                alert(message)
            }
            handleCreateProject(params)
        } catch (error) {
            console.log(`Add project error ${error}`)
        }

    }

    return (
        <div className="create__project" tabIndex="-1">
            <div className="row modal__wrapper">
                <div className="modal__wrapper--left col span-1-of-8">
                    <ul>
                        <li><button to =""><i className="fa fa-plus"></i>{" "}프로젝트 생성</button></li>
                    </ul>
                </div>

                <div className="modal__wrapper--right col span-7-of-8">
                    <div className="wrapper__header">
                        <h3>프로젝트 생성</h3>
                        <button className="close" onClick={()=>{closeModal(false)}}>x</button>
                    </div>
                    <div className="wrapper__body">
                            <div>
                                <p>프로젝트 정보를 입력해주세요. </p>
                                <div className ="name">
                                    <input type="text" name="" id="" placeholder="프로젝트 이름 입력해주세요" value={name} onChange = {(e) => setName(e.target.value)}/>
                                </div>
                            </div>
                            <div className="wrapper__body--selector">
                                <div className ="list__language">
                                    <span className="wrapper__body--title"> 언어 선택</span>
                                    <select name="" id="" value={language} onChange={(e) => setLanguage(e.target.value)}>
                                        <option value="c">C</option>
                                        <option value="cpp">C++</option>
                                        <option value="java">Java</option>
                                        <option value="python">Python</option>
                                        {/* <option value="r">R</option> */}
                                    </select>
                                </div>
                                <div className ="list__category">
                                    <span className="wrapper__body--title"> 분야 선택</span>
                                    <select name="" id="" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        <option value="기초 프로그래밍">기초 프로그래밍</option>
                                        <option value="심화 프로그래밍">심화 프로그래밍</option>
                                        <option value="인공지능프로그래밍기초와실습">인공지능프로그래밍기초와실습</option>
                                        <option value="프로그래밍기초와실습">프로그래밍기초와실습</option>
                                        {/* <option value="객체지향 프로그래밍">객체지향 프로그래밍</option> */}
                                        {/* <option value="Python">이공계열을 위한 Python과 AI 기초</option>
                                        <option value="인문사회계열">인문사회계열을 위한 Python과 AI 기초</option> */}
                                    </select>
                                </div>
                                <div className ="list__usage">
                                    <span className="wrapper__body--title"> 용도 선택</span>
                                    <select name="" id="" value={usage} onChange={(e) => setUsage(e.target.value)}>
                                        <option value="자료구조 학습용">자료구조 학습용</option>
                                        <option value="알고리즘 학습용">알고리즘 학습용</option>
                                        <option value="과제 학습용">과제 학습용</option>
                                        <option value="기타 학습용">기타 학습용</option>
                                    </select>
                                </div>
                            </div>
                            <div className="wrapper__body--inputtags">
                                <span className="wrapper__body--title"> 태그명 입력</span>
                                <input type="text" name="tag" id="project_tag" placeholder="태그를 입력하고 Enter 혹은 추가 버튼을 눌러주세요.(1개씩 최대 5번까지 가능)" value={tempTag} 
                                        onChange = {(e) => { setTempTag(e.target.value)}}
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
                                        onBlur = {() => setAddButton(false)}
                                        />
                                <input type="button" value="추가" onClick={() => setTag()} style={styleAdd}/>
                                <div className="list__tags">
                                    {
                                        tags.length !== 0 ? 
                                        <>
                                            {
                                                tags.map((item, idx) => 
                                                    <button key={idx}>{item}<span style={{cursor: "pointer"}} onClick={() => removeTag(idx)}>x</span></button> 
                                                )
                                            }
                                        </> :
                                        ""
                                    }
                                </div>
                            </div>
                            <div className="wrapper__submit">
                                <button type="button" onClick={() => handleSubmitProject()}>프로젝트 생성</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

CreateProjectModal.propTypes = {

}

export default CreateProjectModal
import React from 'react'
import './style.scss'
import { NavLink , withRouter } from 'react-router-dom'
import Image from '../../constansts/images'

function MenuLeft(props) {
    // const user = useSelector(state => state.user);
    return (
        <div className="menu">
            <div className="menu__logo" onClick={() => props.history.push('/')}>
                <img src={Image.logo} alt="" srcSet=""/>
            </div>
            <div className="menu__text">
                <h3>PLASS DGU</h3>
                <h4>IDE</h4>
            </div>
            <div className="menu__list">
                <ul>
                    <li><NavLink to="/projects"><i className="fa fa-dropbox"></i>내 프로젝트</NavLink></li>
                    <li><NavLink to="/github"><i className="fa fa-github"></i>Github 연결</NavLink></li>
                    {/* <li><NavLink to="/teams"><i class="fa fa-users"></i>팀 생성</NavLink></li>
                    <li><NavLink to="/calender"><i class="fa fa-calendar"></i>일정 관리</NavLink></li>
                    <li><NavLink to="/trash"><i class="fa fa-archive"></i>휴지통</NavLink></li> */}
                </ul>
            </div>
        </div>
    )
}

MenuLeft.propTypes = {}

export default withRouter(MenuLeft)



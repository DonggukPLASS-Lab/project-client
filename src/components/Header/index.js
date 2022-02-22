import React from 'react'
import './Header.scss'
import { useSelector } from 'react-redux';

function Header(props) {
    const user = useSelector(state => state.user);
    return (
        <header className="header">
            <div className="header__list">
                <ul>
                    {/* <li><button onClick={() => alert('현재 구현중입니다.')}><i className="fa fa-search"></i></button></li> */}
                    {/* <li><button onClick={() => alert('현재 구현중입니다.')}><i className="fa fa-bell"></i></button></li> */}
                    {/* <li><button onClick={() => alert('현재 구현중입니다.')}><i className="fa fa-plus"></i></button></li> */}
                    <li style={{color: 'white'}}>
                    {
                        user.userData && user.userData.isAuth ?
                            <p>{user.userData.data.username + " 님"}</p>
                        :   <p>접근 권한이 없습니다.</p>
                    }
                    </li>
                    <li>&nbsp;&nbsp;<button><i className="fa fa-user-circle"></i></button></li>
                </ul>
            </div>
        </header>
    )
}

Header.propTypes = {}

export default Header


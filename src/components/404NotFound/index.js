import React from 'react'
import styled from 'styled-components'
import MainLayout from '../../layouts/MainLayouts'

function NotFound(props) {
    return (
    <MainLayout>
        <Wrapper>
            현재 페이지를<span>개발중 </span> 입니다.
        </Wrapper>
    </MainLayout>
    )
}
const Wrapper = styled.div`
    height: 85vh;
    background: #1C2022;    
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: white;
    span{
        color: rgb(9, 113, 241);
        padding: 0px 5px;
    }
`
export default NotFound


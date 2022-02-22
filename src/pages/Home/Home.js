import React from 'react'
import MainLayout from '../../layouts/MainLayouts'
import styled from 'styled-components'

function Home() {
    return (
        <MainLayout>
            <Wrapper>
                안녕하세요, 웹 IDE 방문을 환영합니다.
            </Wrapper>
        </MainLayout>
    )
}
const Wrapper = styled.div`
    height: 85vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    color: white;
    background: #1C2022;
`

export default Home


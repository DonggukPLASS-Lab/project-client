import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Switch from "react-switch";
import moment from 'moment'
import userAPI from '../../../../apis/userAPI'

function Container({container, handleChangeStatus}) {
    const [checked, setChecked] = useState(false);
    const [waiting, setWaiting] = useState(false);

    const handleChange = async (checked) =>  {
        setWaiting(true);
        try {
            await userAPI.setStatusContainer();
            setChecked(checked)
            setTimeout(function(){
                setWaiting(false);
                handleChangeStatus(checked);
            }, 5000);
        } catch (error) {
            alert('컨테이너 상태 변경 오류가 발생했습니다. 다시 시도해주세요')            
        }
    }

    useEffect(() => {
        let stateCheck = container.status ? true : false;
        setChecked(stateCheck)
    }, [])

    return (
        <WrapperContainer>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>소프트웨어 스택</th>
                        <th>생성 날짜</th>
                        <th>상태</th>
                        {/* <th>미지막 접근</th> */}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th width="5%">1</th>
                        <th width="15%"> {container.containername}</th>
                        <th width="15%">{container.image}</th>
                        <th width="25%">{ moment(container.created).format('YYYY-MM-DD, h:mm:ss a')}</th>
                        <th width="15%">
                            {
                                waiting ?
                                    <WrapperWaiting>Waiting...</WrapperWaiting> : 
                                <Switch
                                onChange={handleChange}
                                checked={checked}
                                className="react-switch"/>
                            }   
                        </th>
                        {/* <th width="25%">{ moment(container.created).format('YYYY-MM-DD, h:mm:ss a')}</th> */}
                    </tr>
                </tbody>
            </table>
        </WrapperContainer>
    )
}
const WrapperContainer = styled.div`
    /* margin-bottom: 2rem; */
    table{
        width: 100%;
        /* background: red; */
        thead, tbody{
            font-size: 14px;
        }
        tbody tr{
            height: 50px;
        }
        font-family: 'Noto Sans KR', 'Roboto';
    }
    .react-switch {
        margin-top: 5px;
    }
`
const WrapperWaiting = styled.div`
    background: #41833E;
    display: inline;
    padding: 3px 10px;
    border-radius: 15px;
`
export default Container

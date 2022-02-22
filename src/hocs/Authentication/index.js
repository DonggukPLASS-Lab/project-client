import React, { useState } from 'react'
import userAPI from '../../apis/userAPI';
import { auth, loginUser } from '../../_actions/userAction';
import { useSelector, useDispatch } from 'react-redux';

import qs from 'querystring'
import SH256 from '../../constansts/hashSHA256';


//fist get id && password from url => auth => save token in localstore
//send check exist token in localstore 
//if exist token in localstore => OK
//else if don't exist token => authen fail
export default function (ComposedClass, load = false, adminRoute = null) {
    function Authentication(props) {
        const [authValue, setAuthValue] = useState(false);
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();
        React.useEffect(() => {
            const query = qs.parse(window.location.search.slice(1));
            if (load) {

                //get id and password from url
                if (!query.id && !query.token) {
                    // alert("접근 관한이 없습니다");
                    setAuthValue(false);
                    props.history.push('/')
                } else {
                    try {
                        const params = {
                            userId: query.id
                        }
                        //Check sended values
                        const allAPI = async () => {
                            const resp = await userAPI.getTimeCreated(params);
                            const { data } = resp;
                            var encodeValue = SH256(String(data));
                            if (query.token !== encodeValue) {
                                localStorage.removeItem("project_manager");
                                localStorage.removeItem("redirect_token");
                                setAuthValue(false);
                                localStorage.removeItem("project_manager");
                                localStorage.removeItem("redirect_token");
                                props.history.push('/')
                            } else {
                                //use id and password loginUser after save token to localstore
                                let dataSubmit = {
                                    id: query.id,
                                };
                                dispatch(loginUser(dataSubmit)).then(response => {
                                    const { result, message } = response.payload;
                                    if (result) {
                                        const { jwt } = response.payload;
                                        localStorage.setItem("project_manager", jwt);
                                        localStorage.setItem("redirect_token", query.token)

                                        dispatch(auth()).then(response => {
                                            if (response.payload.isAuth) {
                                                setAuthValue(true)
                                                props.history.push('/projects')
                                            } else {
                                                setAuthValue(false)
                                                props.history.push('/')
                                            }
                                        })
                                    } else {
                                        setAuthValue(false);
                                        props.history.push('/')
                                    }

                                })
                            }
                        }
                        allAPI();
                    } catch (error) {
                        localStorage.removeItem("project_manager");
                        localStorage.removeItem("redirect_token")
                        console.log(error)
                    }
                }
            }else{

                const problem_manager = localStorage.getItem("project_manager") ? localStorage.getItem("project_manager") : "";
                if(problem_manager){
                    dispatch(auth()).then(response => {
                        if (response.payload.isAuth) {
                            setAuthValue(true)
                            props.history.push('/projects')
                        } else {
                            setAuthValue(false)
                            props.history.push('/')
                        }
                    })
                }else {
                    setAuthValue(false);
                    props.history.push('/')
                }
            }
                    
        }, [dispatch, props.history])
        if (!setAuthValue) {
            console.log('접근 권한이 없습니다...')
        }
        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return Authentication;
}

import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './assets/styles/grid.css'
// import Header from './components/Header
// import MenuLeft from './components/MenuLeft';
import NotFound from './components/404NotFound';
import Loading from './components/Loading/Loading';

import Auth from './hocs/Authentication';
import Home from './pages/Home/Home';
import io from 'socket.io-client';
import { useState } from 'react';

const Project = React.lazy(() => import('./pages/Project'))

function App() {

	const [socket, setSocket] = useState(null);
	const sendToEmit = (messageType, payload, socketId) => {
		socket.emit(messageType, {
			socketId,
			payload
		})
	}
	useEffect(() => {
		const _socket = io.connect(
			`${process.env.REACT_APP_SERVER_API}/vscode`,
			{
				path: `/io/vscode`,
			}
		)
		setSocket(_socket)
	}, [window.location])

  return (
    <div className="project-manager" >
      <Suspense fallback = {<Loading type={'bars'} color={'white'} />}>
        <BrowserRouter>
          <Switch>
            <Route exact path = "/" component = {Auth(Home, true)}/>
            <Route exact path = "/projects"  component = {Auth(Project,null)}/>
            <Route component = {NotFound} />
          </Switch>
          </BrowserRouter>
      </Suspense>
    </div>
  );
}
// const LandingPage = () => {
//   return <Wrapper>
//       로딩중입니다...
//   </Wrapper>
// } 

export default App;

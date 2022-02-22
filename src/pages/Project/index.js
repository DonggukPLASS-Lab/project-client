import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import ListProjects from './pages/ListProjects';

function Project(props) {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route exact path = {match.url} component = {ListProjects} />        
        </Switch>
    )
}

Project.propTypes = {

}

export default Project


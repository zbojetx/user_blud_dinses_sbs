import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Master from './Master';
import Login from './component/auth/Login';
import LoginBlud from './component/auth/Loginblud';
import Blud from './component/Blud'

import Inputmurni from './component/Inputmurni';
import Rincian from './component/Rincian';

function Routemain(){
    return(
        <Router history={browserHistory}>
            <Route path={`${process.env.PUBLIC_URL}/`} component={LoginBlud} />
            <Route path='/admin' component={Login} />
            <Route component={Master}>
                <Route path={`${process.env.PUBLIC_URL}/rincian`} component={Rincian} />
                <Route path={`${process.env.PUBLIC_URL}/blud`} component={Blud} />
                <Route path={`${process.env.PUBLIC_URL}/inputmurni`} component={Inputmurni} />
            </Route>
        </Router>
    );
}

export default Routemain
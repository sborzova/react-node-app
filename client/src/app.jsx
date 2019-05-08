import React, { Component } from 'react';
import './App.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import FeedbackList from './components/containers/FeedbackList';
import Customers from './components/containers/Customers';
import LayoutMenu from "./components/layouts/Layout";
import Feedback from "./components/containers/Feedback";
import Licenses from "./components/containers/Licenses";
import Dev from "./components/containers/Dev";
import moment from 'moment';
import 'moment/locale/cs';
import Dashboard from "./components/containers/Dashboard";
import Notfound from "./components/layouts/404";
import { HashRouter } from "react-router-dom";
import Customer from "./components/containers/Customer";

moment.locale('cs'); // change the global locale

class App extends Component {
    render() {
        return (
                <HashRouter>
                    <LayoutMenu>
                        <Switch>
                            <Route exact path="/" component={Dashboard}/>
                            <Route exact path="/feedback"
                                   render={() => <FeedbackList type="feedback"/>}/>
                            <Route exact path="/customers" component={Customers}/>
                            <Route exact path="/customers/detail/:customer" component={Customer}/>
                            <Route path="/licenses" component={Licenses}/>
                            <Route path="/dev" component={Dev}/>
                            <Route path="/feedback/detail/:id" component={Feedback}/>
                            <Route component={Notfound} />
                        </Switch>
                    </LayoutMenu>
            </HashRouter>
        )
    }
}

export default App;
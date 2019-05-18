import React, { Component } from 'react';
import './app.css';
import {Route, Switch} from 'react-router-dom';
import FeedbackList from './components/containers/feedbackList';
import CustomerList from './components/containers/customerList';
import LayoutMenu from "./components/layouts/layout";
import FeedbackDetail from "./components/containers/feedbackDetail";
import LicenseList from "./components/containers/licenseList";
import Statistic from "./components/containers/statistic";
import moment from 'moment';
import 'moment/locale/cs';
import Dashboard from "./components/containers/dashboard";
import Notfound from "./components/layouts/notFound";
import { HashRouter } from "react-router-dom";
import CustomerDetail from "./components/containers/customerDetail";
import LicenseDetail from "./components/containers/licenseDetail";

moment.locale('cs'); // change the global locale

class App extends Component {

    render() {
        return (
                <HashRouter>
                    <LayoutMenu>
                        <Switch>
                            <Route exact path="/" component={Dashboard}/>
                            <Route exact path="/feedback"
                                   render={() => <FeedbackList type="feedback/all"/>}/>
                            <Route exact path="/customers" component={CustomerList}/>
                            <Route exact path="/customers/detail/:customer" component={CustomerDetail}/>
                            <Route exact path="/licenses" component={LicenseList}/>
                            <Route exact path="/licenses/detail/:serial" component={LicenseDetail}/>
                            <Route exact path="/statistics" component={Statistic}/>
                            <Route exact path="/feedback/detail/:id" component={FeedbackDetail}/>
                            <Route component={Notfound} />
                        </Switch>
                    </LayoutMenu>
            </HashRouter>
        )
    }
}

export default App;
import React, { Component } from 'react';
import './app.css';
import {Route, Switch} from 'react-router-dom';
import FeedbackList from './scenes/feedbackList.jsx';
import CustomerList from './scenes/customerList.jsx';
import LayoutMenu from "./layouts/layout.jsx";
import FeedbackDetail from "./scenes/feedbackDetail.jsx";
import LicenseList from "./scenes/licenseList.jsx";
import Statistic from "./scenes/statistic.jsx";
import moment from 'moment';
import 'moment/locale/cs';
import Dashboard from "./scenes/dashboard.jsx";
import Notfound from "./layouts/notFound.jsx";
import { HashRouter } from "react-router-dom";
import CustomerDetail from "./scenes/customerDetail.jsx";
import LicenseDetail from "./scenes/licenseDetail.jsx";

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
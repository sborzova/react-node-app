import React, {Component, Fragment} from 'react';
import HeatMap from "./heatMap";
import FeedbackList from "./feedbackList";

import {Link} from "react-router-dom";
import {getLicense} from "../../services/api";

class LicenseDetail extends Component{
    state = {
        loading: false,
        feedback: {},
        license: {}
    };
    heatMapType = 'year/license/' + this.props.match.params.serial;
    feedbackListType = 'feedback/license/' + this.props.match.params.serial;

    componentDidMount() {
        this.fetch();
    }

    fetch = () => {
        getLicense(this.props.match.params.serial)
            .then( (response) => {
                this.setState({
                    loading: false,
                    feedback: response.data.data,
                    license: response.data.data.license
                });
            })
            .catch( (e) => console.log(e))
    };

    render(){
        return (
            <Fragment>
                <h1>Serial number: {this.props.match.params.serial}</h1>
                <table className="table-vertical">
                    <tbody>
                    <tr>
                        <th>determined_customer</th>
                        <td>
                            <Link to={`/customers/detail/${this.state.feedback.determined_customer}`}>
                            {this.state.feedback.determined_customer}
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <th>ident</th>
                        <td>{this.state.license.ident}</td>
                    </tr>
                    <tr>
                        <th>expiration</th>
                        <td>{this.state.license.expiration}</td>
                    </tr>
                    <tr>
                        <th>upgrade</th>
                        <td>{this.state.license.upgrade}</td>
                    </tr>
                    </tbody>
                </table>

                <HeatMap type={this.heatMapType}/>
                <br/>
                <br/>
                <br/>
                <h2>Feedback list</h2>
                <FeedbackList type={this.feedbackListType}/>

            </Fragment>
        )
    }
}

export default LicenseDetail;
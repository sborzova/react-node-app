import React, {Component, Fragment} from 'react';
import HeatMapUploadStart from "../components/heatMapUploadStart";
import FeedbackList from "./feedbackList";

import {Link} from "react-router-dom";
import {getLicense} from "../services/api";
import {strings} from "../constants/strings";
import moment from "moment";

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
                <h1>{strings.HEADER_LICENSE_SERIAL} {this.props.match.params.serial}</h1>
                <table className="table-vertical">
                    <tbody>
                    <tr>
                        <th>{strings.FB_DETAIL_DETERMINED_CUSTOMER}</th>
                        <td>
                            <Link to={`/customers/detail/${this.state.feedback.determined_customer}`}>
                            {this.state.feedback.determined_customer}
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <th>{strings.FB_DETAIL_IDENT}</th>
                        <td>{this.state.license.ident}</td>
                    </tr>
                    <tr>
                        <th>{strings.FB_DETAIL_EXPIRATION}</th>
                        <td>{this.state.license.expiration && this.state.license.expiration !== 'unlimited'
                            ? moment(this.state.license.expiration).format('L')
                            : <span className="infinity">∞</span>}</td>
                    </tr>
                    <tr>
                        <th>{strings.FB_DETAIL_UPGRADE}</th>
                        <td>{moment(this.state.license.upgrade).format('L')}</td>
                    </tr>
                    </tbody>
                </table>

                <HeatMapUploadStart type={this.heatMapType}/>
                <br/>
                <br/>
                <br/>
                <h2>{strings.HEADER_FB_LIST}</h2>
                <FeedbackList type={this.feedbackListType}/>

            </Fragment>
        )
    }
}

export default LicenseDetail;
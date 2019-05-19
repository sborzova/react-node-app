import React, {Component} from 'react';
import { Tooltip } from 'antd';

import 'antd/dist/antd.css';
import moment from 'moment';
import {tooltips} from "../../constants/tooltips";
import {strings} from "../../constants/strings";


class FeedbackStatus extends Component {

    getStatusWithTooltip(status){
        return (
            <Tooltip key={this.props.feedback.fa_id + status} placement="top" title={tooltips[status]}>
                <span className={status}/>
            </Tooltip>
        )
    }

    render() {
        let fb = this.props.feedback;
        let status = [];
        if (fb.license){
            if (fb.license.expiration &&
                moment().startOf('day').diff(moment(fb.license.expiration), 'days')>0){
                status.push(this.getStatusWithTooltip('expiration'));
            }
            let devcount = parseInt(fb.license.devcount);

            if (devcount && fb.reporter){
                let users = parseInt(fb.reporter.reporter_users);
                if (users && (users > devcount)){
                    status.push(this.getStatusWithTooltip('reporterusers'));
                }
                let clients = parseInt(fb.reporter.reporter_clients);
                if (clients && clients > devcount){
                    status.push(this.getStatusWithTooltip('reporterclients'));
                }
            }
        }

        if (fb.deviceStatus){
            if (!fb.deviceStatus.uptime.includes('day')){
                status.push(this.getStatusWithTooltip('reboot'));
            }
            if (fb.deviceStatus.n_panics && fb.deviceStatus.n_panics != 0){
                status.push(this.getStatusWithTooltip('panics'));
            }
            if (fb.deviceStatus.n_aborts && fb.deviceStatus.n_aborts != 0){
                status.push(this.getStatusWithTooltip('aborts'));
            }
            if (fb.deviceStatus.core_dumps && fb.deviceStatus.core_dumps.length > 0){
                status.push(this.getStatusWithTooltip('coredumps'));
            }
        }

        if (status.length == 0){
            return <span>{strings.STATUS_OK}</span>
        }else {
            return (
                <React.Fragment>
                    {status}
                </React.Fragment>)
        }
    }
}

export default FeedbackStatus;
import React, {Component} from 'react';
import {Badge, Table, Tooltip, Icon, Popover} from 'antd';

import 'antd/dist/antd.css';
import moment from 'moment';
import {tooltips} from "../../constants/tooltips";
import {strings} from "../../constants/strings";


class FeedbackStatus extends Component {

    getStatusWithTooltip(status){
        return (
            <Tooltip placement="top" title={tooltips[status]}>
                <span className={status}/>
            </Tooltip>
        )
    }

    render() {
        let fb = this.props.feedback;
        let status = [];
        if (fb.license && moment(fb.license.expiration).isBefore(moment())){
            status.push(this.getStatusWithTooltip('expiration'));
            let devcount = parseInt(fb.license.devcount);
            if (devcount && fb.reporter){
                if (devcount > fb.reporter.reporter_users){
                    status.push(this.getStatusWithTooltip('reporterusers'));
                }
                if (devcount > fb.reporter.reporter_clients){
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
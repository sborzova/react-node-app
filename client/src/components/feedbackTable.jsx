import React, {Component} from 'react';
import {Table, Icon, Popover} from 'antd/lib/index';
import {Link} from "react-router-dom";

import 'antd/dist/antd.css';
import moment from 'moment';
import {tooltips} from "../constants/tooltips";
import {strings} from "../constants/strings";
import FeedbackStatus from "./feedbackStatus";

const popup = (
    <div>
        <div><span className="reboot"/>{tooltips['reboot']}</div>
        <div><span className="panics"/>{tooltips['panics']}</div>
        <div><span className="aborts"/>{tooltips['aborts']}</div>
        <div><span className="coredumps"/>{tooltips['coredumps']}</div>
        <div><span className="expiration"/>{tooltips['expiration']}</div>
        <div><span className="reporterusers"/>{tooltips['reporterusers']}</div>
        <div><span className="reporterclients"/>{tooltips['reporterclients']}</div>
    </div>
);

const columns = [
    {
    title: strings.TABLE_COLUMN_FA_ID,
    dataIndex: 'fa_id',
    render: (id) =>
        <div>
            <Link to={`/feedback/detail/${id}`}>{id}</Link>
        </div>
}, {
    title: strings.TABLE_COLUMN_UPLOAD_START,
    dataIndex: 'upload_start',
    render: (datetime) =>
        <div>{moment(datetime).format('L') + " " + moment(datetime).format('LTS')}</div>
},{
    title: strings.TABLE_COLUMN_CUSTOMER,
    dataIndex: 'determined_customer',
    render: (customer) =>
        <div>
            <Link to={`/customers/detail/${customer}`}>{customer}</Link>
        </div>
},{
    title: strings.TABLE_COLUMN_HOSTNAME,
    dataIndex: 'device.hostname',
},{
    title: strings.TABLE_COLUMN_IDENT,
    dataIndex: 'license.ident',
},{
    title: strings.TABLE_COLUMN_SERIAL,
    dataIndex: 'license.serial',
    render: (serial) =>
        <div>
            <Link to={`/licenses/detail/${serial}`}>{serial}</Link>
        </div>
    },{
    title: strings.TABLE_COLUMN_FB_HOSTNAME,
    dataIndex: 'feedback_hostname',
},{
    title: strings.TABLE_COLUMN_STATUS,
    dataIndex: 'license',
    render: (text, record) => (
        <FeedbackStatus feedback={record}/>),
    },
];

class FeedbackTable extends Component {

    render() {
        return (
            <React.Fragment>
            <Table
                columns={columns}
                rowKey={record => record.fa_id}
                dataSource={this.props.feedback}
                loading={this.props.loading}
                size="small"
            />
                <div>
                    <h2>{strings.HEADER_LEGEND_STATUS}
                        <Popover  content={popup} placement="right">
                            &nbsp;<Icon type="info-circle" theme="filled"/>
                        </Popover>
                    </h2>
                </div>
            </React.Fragment>)
    }
}

export default FeedbackTable;
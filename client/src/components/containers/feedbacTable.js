import React, {Component} from 'react';
import {Badge, Table, Tooltip, Icon, Popover} from 'antd';
import {Link} from "react-router-dom";

import 'antd/dist/antd.css';
import moment from 'moment';

const tooltips  = {
    black : 'Reboot',
    red: 'LicenseDetail expiration',
    yellow: 'Nonzero n_panics',
    orange: 'Nonzero n_aborts',
    green: 'Nonempty core_dumps',
    blue: 'devcount greater than reporter_users',
    pink: 'devcount greater than reporter_clients'
};


const popup = (
    <div>
        <Badge color="black" text={tooltips['black']}/><br/>
        <Badge color="red" text={tooltips['red']}/><br/>
        <Badge color="yellow" text={tooltips['yellow']}/><br/>
        <Badge color="orange" text={tooltips['orange']}/><br/>
        <Badge color="green" text={tooltips['green']}/><br/>
        <Badge color="blue" text={tooltips['blue']}/><br/>
        <Badge color="pink" text={tooltips['pink']}/><br/>
    </div>
);

const columns = [
    {
    title: 'Fa id',
    dataIndex: 'fa_id',
    render: (id) =>
        <div>
            <Link to={`/feedback/detail/${id}`}>{id}</Link>
        </div>
}, {
    title: 'Upload start',
    dataIndex: 'upload_start',
    render: (datetime) =>
        <div>{moment(datetime).format('L') + " " + moment(datetime).format('LTS')}</div>
},{
    title: 'CustomerDetail',
    dataIndex: 'determined_customer',
    render: (customer) =>
        <div>
            <Link to={`/customers/detail/${customer}`}>{customer}</Link>
        </div>
},{
    title: 'Hostname',
    dataIndex: 'device.hostname',
},{
    title: 'Ident',
    dataIndex: 'license.ident',
},{
    title: 'Serial',
    dataIndex: 'license.serial',
    render: (serial) =>
        <div>
            <Link to={`/licenses/detail/${serial}`}>{serial}</Link>
        </div>
    },{
    title: 'Feedback hostname',
    dataIndex: 'feedback_hostname',
},{
    title: 'Status',
    dataIndex: 'color',
    render: color => (
        <span>
          {color.map(c => {
              return(
                  <Tooltip placement="top" title={tooltips[c]}>
                      <Badge color={c}/>
                  </Tooltip>)
          })}
        </span>),
    },
];

class FeedbackTable extends Component {

    constructor(props) {
        super(props);
    }

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
                    <h2>Legend for status
                        <Popover  content={popup} placement="right">
                            &nbsp;<Icon type="info-circle" theme="filled"/>
                        </Popover>
                    </h2>

                </div>
            </React.Fragment>)
    }
}

export default FeedbackTable;
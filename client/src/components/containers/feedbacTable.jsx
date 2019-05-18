import React, {Component} from 'react';
import {Badge, Table, Tooltip, Icon, Popover} from 'antd';
import {Link} from "react-router-dom";

import 'antd/dist/antd.css';
import moment from 'moment';
import {strings} from "../../constants/strings";

const tooltips  = {
    black : strings.TOOLTIP_REBOOT,
    red: strings.TOOLTIP_EXPIRATION,
    yellow: strings.TOOLTIP_PANICS,
    orange: strings.TOOLTIP_ABORTS,
    green: strings.TOOLTIP_CORE_DUMPS,
    blue: strings.TOOLTIP_HIGH_REPORTER_USERS,
    pink: strings.TOOLTIP_HIGH_REPORTER_CLIENTS
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
import React, {Component, Fragment} from 'react';
import {Table, Badge, Tooltip, Popover, Icon} from 'antd';
import {Link} from "react-router-dom";
import moment from 'moment';
import {getAllCustomers} from "../../services/api";
import {strings} from "../../constants/strings";

const tooltips  = {
    green : strings.TOOLTIP_ACTIVE_FB,
    red: strings.TOOLTIP_ACTIVE_NO_FB,
    blue: strings.TOOLTIP_INACTIVE_FB,
    yellow: strings.TOOLTIP_INACTIVE_NO_FB,
    grey: strings.TOOLTIP_OTHER
};

const popup = (
    <div>
        <h4>{strings.HEADER_ACTIVE_CUSTOMERS}</h4>
        <Badge color="green" text={strings.TOOLTIP_FB} />
        <br />
        <Badge color="red" text={strings.TOOLTIP_NO_FB} />
        <br />
        <br />
        <h4>{strings.HEADER_INACTIVE_CUSTOMERS}</h4>
        <Badge color="blue" text={strings.TOOLTIP_FB} />
        <br />
        <Badge color="yellow" text={strings.TOOLTIP_NO_FB} />
        <br />
        <br />
        <Badge color="grey" text={strings.TOOLTIP_OTHER} />
    </div>
);

const columns = [
    {
        title: null,
        dataIndex: 'feedbacks',
        width: '10%',
        render: feedbacks => (
            <span>
              {feedbacks.map(fb => {
                  return(
                      <Tooltip placement="top" title={tooltips[fb.color]}>
                          <Badge color={fb.color} key={fb.fa_id}/>
                      </Tooltip>)
              })}
            </span>
        ),
    },
    {
    title: strings.TABLE_COLUMN_CUSTOMER,
    dataIndex: 'determined_customer',
    render: (customer) =>
        <div>
            <Link to={`/customers/detail/${customer}`}>{customer}</Link>
        </div>
    }
];


const columnsNested = [
    {
        title: null,
        dataIndex: 'color',
        render: (color) =>
            <Tooltip placement="top" title={tooltips[color]}>
                <Badge color={color}/>
            </Tooltip>
    },
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
    }, {
        title: strings.TABLE_COLUMN_EXPIRATION,
        dataIndex: 'expiration',
        render: (datetime) => {
            if (datetime !== 'undefined' && datetime !== 'unlimited'){
                let className = '';
                if (moment(datetime).isBefore(moment())){
                    className = 'font-red'
                }else if (moment(datetime).diff(moment(), 'days') <= 7){
                    className = 'font-orange'
                }else if (moment(datetime).diff(moment(), 'days') <= 31){
                    className = 'font-yellow'
                }
                return <div className={className}>{moment(datetime).format('L')}</div>
            }else {
                return <div className="infinity">∞</div>
            }}
    }, {
        title: strings.TABLE_COLUMN_UPGRADE,
        dataIndex: 'upgrade',
        render: (datetime) => {
            if (datetime !== 'undefined' && datetime !== 'unlimited'){
                let className = '';
                if (moment(datetime).isBefore(moment())){
                    className = 'font-red'
                }else if (moment(datetime).diff(moment(), 'days') <= 7){
                    className = 'font-orange'
                }else if (moment(datetime).diff(moment(), 'days') <= 31){
                    className = 'font-yellow'
                }
                return <div className={className}>{moment(datetime).format('L')}</div>
            }}
    }, {
        title: strings.TABLE_COLUMN_IDENT,
        dataIndex: 'ident',
    },{
        title: 'strings.TABLE_COLUMN_SERIAL',
        dataIndex: 'serial',
        render: (serial) =>
            <div>
                <Link to={`/licenses/detail/${serial}`}>{serial}</Link>
            </div>
    }
];

class CustomerList extends Component {
    _isMounted = false;
    state = {
        data: [],
        pagination: {},
        loading: false,
        redirect: false,
        redirectTo: null,
        customers: []
    };

    componentDidMount(){
        this._isMounted = true;
        this.fetch();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    fetch = () => {
        this.setState({ loading: true });
        getAllCustomers()
            .then((response) => {
                if(this._isMounted){
                    this.setState({
                        loading: false,
                        customers: response.data.data,
                    });
                }
            })
            .catch( (e) => console.log(e))
    };

    expandedRowRender = record => {
        return (
            <Table
                columns={columnsNested}
                dataSource={record.feedbacks}
                pagination={false}
                rowKey={record => record.serial}
            />
        );
    };

    render() {
        return (
            <Fragment>
                <Table
                    className="components-table-demo-nested"
                    rowKey={record => record.determined_customer}
                    columns={columns}
                    expandedRowRender={record => this.expandedRowRender(record)}
                    dataSource={this.state.customers}
                    loading={this.state.loading}
                />
                <div>
                    <h2>{strings.HEADER_LEGEND_CUSTOMER}
                        <Popover  content={popup} placement="right">
                            &nbsp;<Icon type="info-circle" theme="filled"/>
                        </Popover>
                    </h2>
                </div>
            </Fragment>
        )
    }
}

export default CustomerList;
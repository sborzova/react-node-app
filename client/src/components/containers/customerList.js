import React, {Component, Fragment} from 'react';
import {Table, Badge, Tooltip} from 'antd';
import {Link} from "react-router-dom";
import moment from 'moment';
import {getAllCustomers} from "../../services/api";

const tooltips  = {
    green : 'Active with today\'s feedback',
    red: 'Active with no today\'s feedback',
    blue: 'Inactive with today\'s feedback',
    yellow: 'Inactive with no today\'s feedback',
    grey: 'Other'
};

const columns = [
    {
        title: null,
        key: 'feedbacks',
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
    title: 'Customer',
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
        title: 'Fa_id',
        dataIndex: 'fa_id',
        render: (id) =>
            <div>
                <Link to={`/feedback/detail/${id}`}>{id}</Link>
            </div>
    }, {
        title: 'Upload_start',
        dataIndex: 'upload_start',
        render: (datetime) =>
            <div>{moment(datetime).format('L') + " " + moment(datetime).format('LTS')}</div>
    }, {
        title: 'License expiration',
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
        title: 'License upgrade',
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
        title: 'Ident',
        dataIndex: 'ident',
    },{
        title: 'Serial',
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
                    <h2>Legend</h2>
                    <h4>Active customers (license upgrade in the future)</h4>
                    <Badge color="green" text="There was a feedback today" />
                    <br />
                    <Badge color="red" text="There was no feedback today" />
                    <br />
                    <br />
                    <h4>Inactive customers</h4>
                    <Badge color="blue" text="There was a feedback today" />
                    <br />
                    <Badge color="yellow" text="There was no feedback today" />
                    <br />
                    <br />
                    <Badge color="grey" text="Other" />
                </div>
            </Fragment>
        )
    }
}

export default CustomerList;
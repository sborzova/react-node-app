import React, {Component, Fragment} from 'react';
import {
    Table, Badge, Menu, Dropdown, Icon, Tag, Tooltip
} from 'antd';import {Link} from "react-router-dom";
import axios from "axios";
import moment from 'moment';

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
        width: '5%',
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
    },
//     {
//     title: 'Fa_id',
//     dataIndex: 'fa_id',
//     width: '10%',
//     render: (id) =>
//         <div>
//             <Link to={`/feedback/detail/${id}`}>{id}</Link>
//         </div>
// }, {
//     title: 'Upload_start',
//     dataIndex: 'upload_start',
//     width: '20%',
//     render: (datetime) =>
//         <div>{moment(datetime).format('L') + " " + moment(datetime).format('LTS')}</div>
// }, {
//     title: 'License expiration',
//     dataIndex: 'license',
//     width: '20%',
//     render: (datetime) =>{
//     if (datetime !== '' && datetime !== 'unlimited'){
//         return <div>{moment(datetime).format('L')}</div>
//     }
//     }}, {
//     title: 'Info',
//     dataIndex: 'info',
//     filters: [
//         { text: 'possible problem', value: 'possible problem' },
//     ],
//     onFilter: (value, record) => {if (record.info){return record.info.includes(value)}},
//     render: (info) => {
//         if (info){
//             return <Tag color='volcano' key={info}>{info}</Tag>
// }}}

];


const columnsNested = [
    {
        title: null,
        dataIndex: 'color',
        width: '5%',
        render: (color) =>
            <Tooltip placement="top" title={tooltips[color]}>
                <Badge color={color}/>
            </Tooltip>
    },
    {
        title: 'Fa_id',
        dataIndex: 'fa_id',
        width: '10%',
        render: (id) =>
            <div>
                <Link to={`/feedback/detail/${id}`}>{id}</Link>
            </div>
    }, {
        title: 'Upload_start',
        dataIndex: 'upload_start',
        width: '20%',
        render: (datetime) =>
            <div>{moment(datetime).format('L') + " " + moment(datetime).format('LTS')}</div>
    }, {
        title: 'License expiration',
        dataIndex: 'license.expiration',
        width: '20%',
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
        title: 'License upgrade',
        dataIndex: 'license.upgrade',
        width: '20%',
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
        dataIndex: 'license.ident',
    },{
        title: 'Serial',
        dataIndex: 'license.serial',
        render: (serial) =>
            <div>
                <Link to={`/licenses/detail/${serial}`}>{serial}</Link>
            </div>
    }

];

class Customers extends Component {
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
        axios.get(`/api/customers`, )
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
        console.log(record);
        return (
            <Table
                columns={columnsNested}
                dataSource={record.feedbacks}
                pagination={false}
                rowKey={record => record.fa_id}
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

export default Customers;
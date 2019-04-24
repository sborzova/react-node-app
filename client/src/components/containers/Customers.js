import React, {Component} from 'react';
import {Table, Badge, Menu, Dropdown, Icon, Tag
} from 'antd';import {Link} from "react-router-dom";
import axios from "axios";
import moment from 'moment';

const columns = [
    {
    title: 'Customer',
    dataIndex: 'determined_customer',
    width: '100%',
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
const menu = (
    <Menu>
        <Menu.Item>
            Action 1
        </Menu.Item>
        <Menu.Item>
            Action 2
        </Menu.Item>
    </Menu>
);



const data = [];
for (let i = 0; i < 3; ++i) {
    data.push({
        key: i,
        name: 'Screem',
        platform: 'iOS',
        version: '10.3.4.5654',
        upgradeNum: 500,
        creator: 'Jack',
        createdAt: '2014-12-24 23:12:00',
    });
}

const columnsNested = [
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
        dataIndex: 'license',
        width: '20%',
        render: (datetime) =>{
            if (datetime !== '' && datetime !== 'unlimited'){
                return <div>{moment(datetime).format('L')}</div>
            }
    }},{
        title: 'Ident',
        dataIndex: 'license.ident',
    },{
        title: 'Serial',
        dataIndex: 'license.serial'
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

    removeDuplicates(myArr, prop) {
        return myArr.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    }

    fetch = () => {
        this.setState({ loading: true });
        axios.get(`/api/licenses`, )
            .then((response) => {
                const data = response.data;
                const pagination = { ...this.state.pagination };
                pagination.total = data.data.length;
                const customers = this.removeDuplicates(response.data.data, 'determined_customer');
                if(this._isMounted){
                    this.setState({
                        loading: false,
                        data: data.data,
                        customers: customers,
                        pagination,
                    });
                }

            })
            .catch( (e) => console.log(e))
    };

    expandedRowRender = record => {
        const data = this.state.data.filter(d => d.determined_customer === record.determined_customer);
        return (
            <Table
                columns={columnsNested}
                dataSource={data}
                pagination={false}
                rowKey={record => record.fa_id}
            />
        );
    };

    render() {
        return (
            <Table
                className="components-table-demo-nested"
                rowKey={record => record.determined_customer}
                columns={columns}
                expandedRowRender={record => this.expandedRowRender(record)}
                dataSource={this.state.customers}
                loading={this.state.loading}
                pagination={this.state.pagination}

            />
        )
    }
}

export default Customers;
import React, {Component} from 'react';
import {Table} from 'antd';
import {Link} from "react-router-dom";
import axios from "axios";

const columns = [
    {
    title: 'Customer',
    dataIndex: 'determined_customer',
    width: '20%',
    },
    {
    title: 'Fa_id',
    dataIndex: 'fa_id',
    width: '20%',
    render: (id) =>
        <div>
            <Link to={`/feedbacklist/detail/${id}`}>{id}</Link>
        </div>
}, {
    title: 'Upload_start',
    dataIndex: 'upload_start',
    width: '20%',
}, {
    title: 'License expiration',
    dataIndex: 'license',
    width: '40%',
},

];

class Customers extends Component {
    state = {
        customers: [],
        pagination: {},
        loading: false,
        redirect: false,
        redirectTo: null
    };

    componentDidMount(){
        this.fetch();
    }

    fetch = (params = {}) => {
        this.setState({ loading: true });
        const results = 10;
        axios.get(`/api/customers`, )
            .then((response) => {
                const data = response.data;
                const pagination = { ...this.state.pagination };
                // Read total count from server
                pagination.total = data.data.length;
                this.setState({
                    loading: false,
                    customers: data.data,
                    pagination,
                });
            })
            .catch( (e) => console.log(e))
    };

    render() {
        return (
            <Table
                columns={columns}
                rowKey={record => record.fa_id}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
            />

        )
    }
}

export default Customers;
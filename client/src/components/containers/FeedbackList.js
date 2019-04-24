import React, {Component} from 'react';
import {Table} from 'antd';
import {Link, NavLink} from "react-router-dom";
import axios from "axios";

const columns = [{
    title: 'Id',
    dataIndex: 'fa_id',
    width: '20%',
    render: (id) =>
        <div>
            <Link to={`/feedbacklist/detail/${id}`}>{id}</Link>
        </div>
}, {
    title: 'Customer',
    dataIndex: 'determined_customer',
    width: '20%',
}, {
    title: 'License',
    dataIndex: 'license',
    width: '40%',
},

];

class FeedbackList extends Component {
    state = {
        feedbacklist: [],
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
        axios.get(`/api/feedbacklist`, )
            .then((response) => {
                const data = response.data;
                const pagination = { ...this.state.pagination };
                // Read total count from server
                 pagination.total = data.data.length;
                //pagination.total = 200;
                this.setState({
                    loading: false,
                    feedbacklist: data.data,
                    pagination,
                });
        })
        .catch(error => console.log(error));
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

export default FeedbackList;
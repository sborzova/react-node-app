import React, {Component, Fragment} from 'react';
import {Radio, Table} from 'antd';
import {Link} from "react-router-dom";
import axios from "axios";
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import moment from 'moment';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const dateFormat = 'DD.MM.YYYY';

const columns = [{
    title: 'Fa id',
    dataIndex: 'fa_id',
    width: '5%',
    render: (id) =>
        <div>
            <Link to={`/feedback/detail/${id}`}>{id}</Link>
        </div>
}, {
    title: 'Upload start',
    dataIndex: 'upload_start',
    width: '15%',
    render: (datetime) =>
        <div>{moment(datetime).format('L') + " " + moment(datetime).format('LTS')}</div>
},{
    title: 'Customer',
    dataIndex: 'determined_customer',
    width: '20%',
    render: (customer) =>
        <div>
            <Link to={`/customers/detail/${customer}`}>{customer}</Link>
        </div>
},{
    title: 'Hostname',
    dataIndex: 'device.hostname',
    width: '20%',
},{
    title: 'Ident',
    dataIndex: 'license.ident',
    width: '20%',
},{
    title: 'Feedback hostname',
    dataIndex: 'feedback_hostname',
    width: '20%',
},

];

class FeedbackList extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            feedback: [],
            pagination: {},
            loading: false,
            redirect: false,
            redirectTo: null,
            period: 'today',
        };
    }

    componentDidMount(){
        this._isMounted = true;
        this.onToday();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onToday(){
        this.setState({period: 'today'});
        const now = moment(new Date()).startOf('day').format( 'DD.MM.YYYY');
        this.fetch(now, now);
    }

    onWeek(){
        this.setState({period: 'week'});
        const now = moment(new Date()).startOf('day').format( 'DD.MM.YYYY');
        const beforeWeek = moment(new Date()).subtract(7,"day").startOf('day').format( 'DD.MM.YYYY');
        this.fetch(beforeWeek, now);
    }

    onMonth(){
        this.setState({period: 'month'});
        const now = moment(new Date()).startOf('day').format( 'DD.MM.YYYY');
        const beforeWeek = moment(new Date()).subtract(1,"month").startOf('day').format( 'DD.MM.YYYY');
        this.fetch(beforeWeek, now);
    }

    onYear(){
        this.setState({period: 'year'});
        const now = moment(new Date()).startOf('day').format( 'DD.MM.YYYY');
        const beforeYear = moment(new Date()).subtract(1,"year").startOf('day').format( 'DD.MM.YYYY');
        this.fetch(beforeYear, now);
    }

    onCalendar(date, dateString){
        this.setState({period: 'calendar'});
        this.fetch(dateString[0], dateString[1]);
    }

    fetch = (from, to) => {
        this.setState({ loading: true });
        axios.post(`/api/${this.props.type}`, {from: from, to: to})
            .then((response) => {
                const data = response.data;
                const pagination = { ...this.state.pagination };
                 pagination.total = data.data.length;
                if (this._isMounted) {
                    this.setState({
                        loading: false,
                        feedback: data.data,
                        pagination,
                    });
                }
        })
        .catch(error => console.log(error));
    };

    render() {
        return (
            <React.Fragment>
                <Radio.Group value={this.state.period}>
                    <Radio.Button value="today" onClick={this.onToday.bind(this)}>Today</Radio.Button>
                    <Radio.Button value="week" onClick={this.onWeek.bind(this)}>Week</Radio.Button>
                    <Radio.Button value="month" onClick={this.onMonth.bind(this)}>Month</Radio.Button>
                    <Radio.Button value="year" onClick={this.onYear.bind(this)}>Year</Radio.Button>
                </Radio.Group>
                <RangePicker format={dateFormat} onChange={this.onCalendar.bind(this)}/>
            <Table
                columns={columns}
                rowKey={record => record.fa_id}
                dataSource={this.state.feedback}
                pagination={this.state.pagination}
                loading={this.state.loading}
                size="small"
            />
            </React.Fragment>)
    }
}

export default FeedbackList;
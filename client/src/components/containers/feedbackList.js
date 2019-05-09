import React, {Component} from 'react';
import {Badge, Radio, Table, Tooltip} from 'antd';
import {Link} from "react-router-dom";
import axios from "axios";
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import moment from 'moment';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const dateFormat = 'DD.MM.YYYY';

const tooltips  = {
    black : 'Reboot',
    red: 'LicenseDetail expiration',
    yellow: 'Nonzero n_panics',
    orange: 'Nonzero n_aborts',
    green: 'Nonempty core_dumps',
    blue: 'devcount greater than reporter_users',
    pink: 'devcount greater than reporter_clients'
};

const columns = [
    {
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
    title: null,
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

class FeedbackList extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            feedback: [],
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
        axios.get(`/api/${this.props.type}`,
            {params: {from: from, to: to}})
            .then((response) => {
                const data = response.data;
                if (this._isMounted) {
                    this.setState({
                        loading: false,
                        feedback: data.data,
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
                <div>
                    <h2>Legend</h2>
                    <Badge color="black" text={tooltips['black']}/><br/>
                    <Badge color="red" text={tooltips['red']}/><br/>
                    <Badge color="yellow" text={tooltips['yellow']}/><br/>
                    <Badge color="orange" text={tooltips['orange']}/><br/>
                    <Badge color="green" text={tooltips['green']}/><br/>
                    <Badge color="blue" text={tooltips['blue']}/><br/>
                    <Badge color="pink" text={tooltips['pink']}/><br/>
                </div>
            </React.Fragment>)
    }
}

export default FeedbackList;
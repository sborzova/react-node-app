import React, {Component} from 'react';
import {message, Radio} from 'antd/lib/index';

import 'antd/dist/antd.css';
import moment from 'moment';
import { DatePicker } from 'antd';
import {strings} from "../constants/strings";
import {getAllFeedbacksForInterval} from "../services/api";
import FeedbackTable from "../components/feedbackTable";
const { RangePicker } = DatePicker;

const dateFormat = 'DD.MM.YYYY';

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
        getAllFeedbacksForInterval(this.props.type, from, to)
            .then((response) => {
                const data = response.data;
                if (this._isMounted) {
                    this.setState({
                        loading: false,
                        feedback: data.data,
                    });
                }
        })
        .catch(e => {
            message.error(strings.ERROR)
        });
    };

    render() {
        return (
            <React.Fragment>
                <Radio.Group value={this.state.period}>
                    <Radio.Button value="today" onClick={this.onToday.bind(this)}>
                        {strings.PERIOD_TODAY}
                    </Radio.Button>
                    <Radio.Button value="week" onClick={this.onWeek.bind(this)}>
                        {strings.PERIOD_WEEK}
                    </Radio.Button>
                    <Radio.Button value="month" onClick={this.onMonth.bind(this)}>
                        {strings.PERIOD_MONTH}
                    </Radio.Button>
                    <Radio.Button value="year" onClick={this.onYear.bind(this)}>
                        {strings.PERIOD_YEAR}
                    </Radio.Button>
                </Radio.Group>
                <RangePicker format={dateFormat} onChange={this.onCalendar.bind(this)}/>
            <FeedbackTable feedback={this.state.feedback} loading={this.state.loading}/>
            </React.Fragment>)
    }
}

export default FeedbackList;
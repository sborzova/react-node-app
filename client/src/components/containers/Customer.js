import React, {Component, Fragment} from 'react';
import HeatMap from "./HeatMap";
import FeedbackList from "./FeedbackList";
import HighchartsReact from 'highcharts-react-official';

import moment from 'moment';
import Highcharts from 'highcharts/highstock';
import {Radio, Spin} from "antd";
import axios from "axios";

class Customer extends Component{
    state = {
        period: 'week',
        categories: [],
        data: [],
        loading: false
    };
    heatMapType = 'year/' + this.props.match.params.customer;
    feedbackListType = 'feedback/' + this.props.match.params.customer;

    componentDidMount(){
        this.fetchHits(this.state.period);
        this.fetchDevices();
    };

    handlePeriodChange = (e) => {
        this.fetchHits(e.target.value);
    };

    fetchHits = (period) => {
        this.setState({ loading: true });
        axios.get(`/api/hits/${period}/` + this.props.match.params.customer)
            .then((response) => {
                let categories = [];
                let count = [];
                const array = response.data.data;
                array.forEach(e => {
                    categories.push(moment(e.date).format('dd DD.MM.YYYY'));
                    count.push(parseInt(e.count));
                    // count.push({
                    //     //x: moment(e.date).format('DD.MM.YYYY'),
                    //     value: parseInt(e.count),
                    //     name: moment(e.date).format('dd DD.MM.YYYY')});
                });

                this.setState({
                    categories: categories,
                    data:count,
                    period: period,
                    loading: false
                })
            })
            .catch(error => console.log(error));
    };

    fetchDevices = () => {
        axios.get(`/api/devices/` + this.props.match.params.customer)
            .then((response) => {
                console.log(response.data);
            })
            .catch(error => console.log(error));
    };

    render(){
        const options = {
            type:'stock',
            title: {
                text: 'summary of hits'
            },
            xAxis: {
                categories: this.state.categories,
                crosshair: true
            },
            yAxis: {
                title: {
                    text: 'Count'
                }
            },
            series: [{
                name: 'Count',
                data: this.state.data
            },
            ]
        };

        return (
            <Fragment>
                <h1>{this.props.match.params.customer}</h1>
                <HeatMap type={this.heatMapType}/>
                <br/>
                <br/>
                <br/>
                <h2>Feedback list</h2>
                <FeedbackList type={this.feedbackListType}/>
                <br/>
                <br/>
                <br/>
                <Radio.Group value={this.state.period} onChange={this.handlePeriodChange}>
                    <Radio.Button value="week">Week</Radio.Button>
                    <Radio.Button value="month">Month</Radio.Button>
                    <Radio.Button value="year">Year</Radio.Button>
                </Radio.Group>
                <Spin spinning={this.state.loading}>
                    <HighchartsReact highcharts={Highcharts} options={options}
                                     //constructorType={"stockChart"}
                    />
                </Spin>

            </Fragment>
        )
    }
}

export default Customer;
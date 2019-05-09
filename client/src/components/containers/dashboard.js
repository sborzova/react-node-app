import React, {Component, Fragment} from 'react';
import { Radio} from "antd";

import HighchartsReact from 'highcharts-react-official';

import moment from 'moment';
import Highcharts from 'highcharts/highstock';
import HeatMap from "./heatMap";
import {getCountAllFeedback} from "../../services/api";

class Dashboard extends Component {
    state = {
        loading: false,
        categories: [],
        data: [],
        period: 'week',
        title: 'week summary of feedback'
    };

    componentDidMount(){
        this.fetch(this.state.period);
    };

    handlePeriodChange = (e) => {
        this.fetch(e.target.value);
    };

    fetch = (period) => {
        this.setState({ loading: true });
            getCountAllFeedback(period)
            .then((response) => {
                let categories = [];
                let count = [];
                const array = response.data.data;
                array.forEach(e => {
                    categories.push(moment(e.date).format('dd DD.MM.YYYY'));
                    count.push(e.count);
                });
                this.setState({
                    categories: categories,
                    data:count,
                    title: period + ' summary of feedback',
                    period: period})
            })
            .catch(error => console.log(error));
    };

    renderSwitch(period, options) {
        switch(period) {
            case 'week':
                return <HighchartsReact highcharts={Highcharts} options={options}/>;
            case 'month':
                return <HighchartsReact highcharts={Highcharts} options={options}/>;
            case 'year':
                return <HeatMap type="all/year"/>;
        }
    };


    render() {

      const options = {
            title: {
                text: this.state.title
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
            tooltip: {
                style: {
                    width: '200px'
                },
                shared: true
            },
            series: [{
                name: 'Count',
                data: this.state.data
            },
            ]
        };

        return (
            <Fragment>
                <Radio.Group value={this.state.period} onChange={this.handlePeriodChange}>
                    <Radio.Button value="week">Week</Radio.Button>
                    <Radio.Button value="month">Month</Radio.Button>
                    <Radio.Button value="year">Year</Radio.Button>
                </Radio.Group>
                {this.renderSwitch(this.state.period, options)}
            </Fragment>
        )
    }
}

export default Dashboard;
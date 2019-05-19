import React, {Component, Fragment} from 'react';
import { Radio, message} from "antd/lib/index";

import HighchartsReact from 'highcharts-react-official';

import moment from 'moment';
import Highcharts from 'highcharts/highstock';
import HeatMapUploadStart from "../components/heatMapUploadStart";
import {getCountAllFeedback} from "../services/api";
import {strings} from "../constants/strings";
import HeatMapProcessed from "../components/heatMapProcessed";

class Dashboard extends Component {
    state = {
        loading: false,
        categories: [],
        data: [],
        period: 'week',
    };

    componentDidMount(){
        this.fetch(this.state.period);
    };

    handlePeriodChange = (e) => {
        this.fetch(e.target.value);
    };

    fetch(period){
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
                    period: period})
            })
            .catch(e => {
                message.error(strings.ERROR)
            });
    };

    renderSwitch(period, options) {
        switch(period) {
            case 'week':
                return <HighchartsReact highcharts={Highcharts} options={options}/>;
            case 'month':
                return <HighchartsReact highcharts={Highcharts} options={options}/>;
            case 'year':
                return (<Fragment>
                            <HeatMapUploadStart title={strings.CHART_FEEDBACKS_TITLE_YEAR} type="all/year"/>
                            <HeatMapProcessed title={strings.CHART_PROCESSED_TITLE_YEAR}/>
                        </Fragment>);
        }
    };

    render() {
        const options = {
                title: { text: strings.CHART_FEEDBACKS_TITLE },
                xAxis: { categories: this.state.categories },
                yAxis: { title: { text: strings.CHART_COUNT } },
                series: [{ name: strings.CHART_COUNT, data: this.state.data }]
          };

        return (<Fragment>
                <Radio.Group value={this.state.period} onChange={this.handlePeriodChange}>
                    <Radio.Button value="week">{strings.PERIOD_WEEK}</Radio.Button>
                    <Radio.Button value="month">{strings.PERIOD_MONTH}</Radio.Button>
                    <Radio.Button value="year">{strings.PERIOD_YEAR}</Radio.Button>
                </Radio.Group>
                {this.renderSwitch(this.state.period, options)}
            </Fragment>)
    }
}

export default Dashboard;
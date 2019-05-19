import React, {Component, Fragment} from 'react';
import HeatMapUploadStart from "../components/heatMapUploadStart";
import FeedbackList from "./feedbackList";
import HighchartsReact from 'highcharts-react-official';

import moment from 'moment';
import Highcharts from 'highcharts/highstock';
import {Radio, Spin, message} from "antd/lib/index";
import HeatMapDevice from "../components/heatMapDevice";

import {getCountDomains, getCountHits} from "../services/api";
import {strings} from "../constants/strings";

class CustomerDetail extends Component{
    state = {
        period: 'week',
        periodDomains: 'week',
        categories: [],
        categoriesDomains: [],
        data: [],
        dataDomains: [],
        loading: false,
        loadingDomains: false
    };
    heatMapType = 'year/' + this.props.match.params.customer;
    feedbackListType = 'feedback/customer/' + this.props.match.params.customer;

    componentDidMount(){
        this.fetchHits(this.state.period);
        this.fetchDomains(this.state.periodDomains);
    };

    handlePeriodChange = (e) => {
        this.fetchHits(e.target.value);
    };

    handlePeriodDomainsChange = (e) => {
        this.fetchDomains(e.target.value);
    };

    fetchHits = (period) => {
        this.setState({ loading: true });
        getCountHits(period, this.props.match.params.customer)
            .then((response) => {
                let categories = [];
                const hostIds = Object.keys(response.data.data);
                response.data.data[hostIds[0]].forEach(host=> {
                    categories.push(moment(host.date).format('dd DD.MM.YYYY'));
                });
                let series = [];
                hostIds.forEach(hostid => {
                    const hosts = response.data.data[hostid];
                    let serie = [];
                    hosts.forEach(h => {
                        serie.push(h.count)
                    });
                    series.push({
                        name: hosts[0].hostname,
                        data: serie
                    })
                });
                this.setState({
                    categories: categories,
                    data:series,
                    period: period,
                    loading: false,
                })

            })
            .catch(e => {
                message.error(strings.ERROR)
            });
    };


    fetchDomains = (period) => {
        this.setState({ loadingDomains: true });
        getCountDomains(period, this.props.match.params.customer)
            .then((response) => {
                let categories = [];
                const hostIds = Object.keys(response.data.data);
                response.data.data[hostIds[0]].forEach(host=> {
                    categories.push(moment(host.date).format('dd DD.MM.YYYY'));
                });
                let series = [];
                hostIds.forEach(hostid => {
                    const hosts = response.data.data[hostid];
                    let serie = [];
                    hosts.forEach(h => {
                        serie.push(h.count)
                    });
                    series.push({
                        name: hosts[0].hostname,
                        data: serie
                    })
                });
                this.setState({
                    categoriesDomains: categories,
                    dataDomains:series,
                    periodDomains: period,
                    loadingDomains: false,
                })

            })
            .catch(e => {
                message.error(strings.ERROR)
            });
    };

    render(){
        const options = {
            chart: { type: 'column' },
            title: { text: strings.CHART_HITS_TITLE },
            xAxis: { categories: this.state.categories },
            yAxis: { title: { text: strings.CHART_COUNT } },
            tooltip: {
                headerFormat: '<span>{point.key}</span><br/>',
                pointFormat: '{point.y}<br/><b>' +strings.CHART_TOTAL+'</b>: {point.stackTotal:,.0f}',
            },
            plotOptions: { column: { stacking: 'normal' } },
            series: this.state.data
        };

        const optionsDomains = {
            chart: { type: 'column' },
            title: { text: strings.CHART_DOMAINS_TITLE },
            xAxis: { categories: this.state.categories },
            yAxis: { title: { text: strings.CHART_COUNT} },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:,.0f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            series: this.state.dataDomains
        };

        return (<Fragment>
                    <h1>{this.props.match.params.customer}</h1>
                    <HeatMapUploadStart type={this.heatMapType} title={strings.CHART_FEEDBACKS_TITLE_YEAR}/><br/><br/><br/>
                    <h2>{strings.HEADER_FB_LIST}</h2>
                    <FeedbackList type={this.feedbackListType}/><br/><br/><br/>
                    <Radio.Group value={this.state.period} onChange={this.handlePeriodChange}>
                        <Radio.Button value="week">{strings.PERIOD_WEEK}</Radio.Button>
                        <Radio.Button value="month">{strings.PERIOD_MONTH}</Radio.Button>
                        <Radio.Button value="year">{strings.PERIOD_YEAR}</Radio.Button>
                    </Radio.Group>
                    <Spin spinning={this.state.loading}>
                        <HighchartsReact highcharts={Highcharts} options={options}/>
                    </Spin>
                    <Radio.Group value={this.state.periodDomains} onChange={this.handlePeriodDomainsChange}>
                        <Radio.Button value="week">{strings.PERIOD_WEEK}</Radio.Button>
                        <Radio.Button value="month">{strings.PERIOD_MONTH}</Radio.Button>
                        <Radio.Button value="year">{strings.PERIOD_YEAR}</Radio.Button>
                    </Radio.Group>
                    <Spin spinning={this.state.loadingDomains}>
                        <HighchartsReact highcharts={Highcharts} options={optionsDomains}/>
                    </Spin>
                    <br/><br/><br/>
                    <HeatMapDevice customer={this.props.match.params.customer}/>
            </Fragment>)
    }
}

export default CustomerDetail;
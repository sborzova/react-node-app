import React, {Component, Fragment} from 'react';
import HeatMap from "./HeatMap";
import FeedbackList from "./FeedbackList";
import HighchartsReact from 'highcharts-react-official';

import moment from 'moment';
import Highcharts from 'highcharts/highstock';
import {Radio, Spin} from "antd";
import axios from "axios";
import DevicesHeatMap from "./DevicesHeatMap";

class License extends Component{
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
    feedbackListType = 'feedback/' + this.props.match.params.customer;

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
        axios.get(`/api/hits/${period}/` + this.props.match.params.customer)
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

            }).catch(error => console.log(error));
    };


    fetchDomains = (period) => {
        console.log(period);
        this.setState({ loadingDomains: true });
        axios.get(`/api/domains/${period}/` + this.props.match.params.customer)
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

            }).catch(error => console.log(error));
    };




    render(){
        const options = {
            chart: {
                type: 'column',
            },
            title: {
                text: 'summary of hits'
            },
            xAxis: {
                categories: this.state.categories,
                //crosshair: true,
            },
            yAxis: {
                title: {
                    text: 'Count'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{point.key}</span><br/>',
                pointFormat: '{point.y}<br/><b>Total</b>: {point.stackTotal:,.0f}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                    }
                }
            },
            series: this.state.data
        };

        const optionsDomains = {
            chart: {
                type: 'column',
            },
            title: {
                text: 'summary of domains'
            },
            xAxis: {
                categories: this.state.categories,
                crosshair: true,
            },
            yAxis: {
                title: {
                    text: 'Count'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:,.0f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: this.state.dataDomains
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
                <Radio.Group value={this.state.periodDomains} onChange={this.handlePeriodDomainsChange}>
                    <Radio.Button value="week">Week</Radio.Button>
                    <Radio.Button value="month">Month</Radio.Button>
                    <Radio.Button value="year">Year</Radio.Button>
                </Radio.Group>
                <Spin spinning={this.state.loadingDomains}>
                    <HighchartsReact highcharts={Highcharts} options={optionsDomains}
                        //constructorType={"stockChart"}
                    />
                </Spin>
                <br/>
                <br/>
                <br/>
                <DevicesHeatMap customer={this.props.match.params.customer}/>

            </Fragment>
        )
    }
}

export default License;
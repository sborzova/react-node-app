import React, {Component} from 'react';
import {message, Spin} from 'antd';

import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highmaps';
import moment from 'moment';
import {getCountDevices} from "../../services/api";
import {strings} from "../../constants/strings";

class HeatMapDevice extends Component{
    state = {
        loading: false,
        data: [],
        categories: [],
        min: 0,
    };

    mapper = new Map();
    _isMounted = false;

    componentDidMount(){
        this._isMounted = true;
        let date = new Date();
        let categories = [];
        categories.push(moment(date).format('MMM YYYY'));
        for (let i=0; i<13; i++){
            this.mapper.set(moment(date).month()+'-'+ moment(date).year(), i);
            date = moment(date).subtract(1, "month");
            categories.push(date.format('MMM YYYY'));
        }
        this.setState({categories:categories});
        this.fetch();
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    fetch = () => {
        this.setState({ loading: true });
        getCountDevices(this.props.customer)
            .then((response) => {
                const hostIds = Object.keys(response.data.data);
                let data = [];
                hostIds.forEach(hostid => {
                    const hosts = response.data.data[hostid];
                    let days = [];
                    hosts.forEach(h => {
                        if (h.deviceStatus){
                            days.push({
                                x: moment(h.upload_start).date()-1,
                                y: this.mapper.get(moment(h.upload_start).month()+'-'+ moment(h.upload_start).year()),
                                value: h.deviceStatus.uptime.includes('day')
                                    ? parseInt(h.deviceStatus.uptime.substr(0, h.deviceStatus.uptime.indexOf('day')))
                                    : 0,
                                name: h.deviceStatus.uptime.includes('day')
                                    ? moment(h.upload_start).format('dd DD.MM.YYYY')+ '<br/>'
                                    + '<b>' +'Uptime: ' + '</b>' + h.deviceStatus.uptime + '<br/>'
                                    : moment(h.upload_start).format('dd DD.MM.YYYY')+ '<br/>'
                                    + '<b>' +'Uptime: ' + '</b>' + h.deviceStatus.uptime + '<br/>'
                                    + 'REBOOT',
                                color: !h.deviceStatus.uptime.includes('day')
                                    ? '#000000' : ''
                            });
                        }
                    });
                    const opt = {
                        chart : { type: 'heatmap' },
                         title : { text: strings.CHART_DEVICE_TITLE + hostid },
                        subtitle: {
                             text: 'hostname: ' + hosts[0].device.hostname + ', ident: ' + hosts[0].license.ident
                        },
                        xAxis : {
                            categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
                        },
                        yAxis : { categories: this.state.categories, title: strings.CHART_MONTHS },
                        colorAxis : {
                            min: 0,
                            stops: [
                                [0, '#FFFF4D'],
                                [0.5, '#FFAE19'],
                                [0.9, '#c4463a']
                            ],
                        },
                        tooltip : {
                            formatter: function () {
                                return this.point.name;
                            }
                        },
                        series : [{ name: strings.CHART_COUNT, data: days }]
                    };
                    data.push(<HighchartsReact
                        key={hostid}
                        highcharts={Highcharts}
                        options={opt}/>)
                });

                if (this._isMounted){
                    this.setState({
                        loading: false,
                        data:data
                    })
                }
            })
            .catch(e => {
                message.error(strings.ERROR)
            });
    };

    render () {
        return (
            <Spin spinning={this.state.loading}>
                {this.state.data}
            </Spin>)
    }
}

export default HeatMapDevice;
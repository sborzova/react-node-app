import React, {Component, Fragment} from 'react';
import {Spin} from "antd";
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import Highcharts from 'highcharts/highstock';
import { DatePicker } from 'antd';
import {getCountKcw, getCountKernunVersion} from "../../services/api";

const dateFormat = 'DD.MM.YYYY';

class Statistic extends Component {
    _isMounted = false;

    kcw = {
        cw_antivirus: { 'true': 0, 'false': 0},
        cw_auto_update: { 'true': 0, 'false': 0},
        cw_dhcp_client: { 'true': 0, 'false': 0},
        cw_dhcp_server: { 'true': 0, 'false': 0},
        cw_hand_off: { 'true': 0, 'false': 0},
        cw_https_insp: { 'true': 0, 'false': 0},
        cw_sshd_enabled: {'true': 0, 'false': 0},
        cw_sshd_kernun: {'true': 0, 'false': 0},
        cw_auth: {'<ntlm/>': 0, '<kerberos/>': 0, '<disabled/>': 0}
    };

    state = {
        loading : false,
        date: moment().format(dateFormat),
        data: {},
        graphs: [],
        dataKcw: [],
        dataAuth: {}
    };

    componentDidMount() {
        this._isMounted = true;
        this.fetchKernun(this.date);
        this.fetchKcw(this.date);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onCalendar(date, dateString){
        this.fetchKernun(dateString);
        this.fetchKcw(dateString);
        this.setState({date: dateString})
    }

    fetchKcw = (date) => {
        this.setState({ loading: true });
        getCountKcw(moment(date).format('YYYY-MM-DD'))
            .then((response) => {
                response.data.data.forEach(d => {
                        for (const prop in d) {
                            if (d.hasOwnProperty(prop) && this.kcw[prop]) {
                                if (prop == 'cw_auth'){
                                    if (d[prop] == '<ntlm/>'){
                                        this.kcw[prop]['<ntlm/>']++;
                                    }else if (d[prop] == '<kerberos/>'){
                                        this.kcw[prop]['<kerberos/>']++;
                                    }else if (d[prop] == '<disabled/>'){
                                        this.kcw[prop]['<disabled/>']++;
                                    }
                                }else if (d[prop] == 'true'){
                                    this.kcw[prop].true++;
                                }else if (d[prop] == 'false'){
                                    this.kcw[prop].false++;
                                }
                            }
                        }
                });
                let trueSerie = [];
                let falseSerie = [];
                for (const prop in this.kcw) {
                    trueSerie.push(this.kcw[prop].true);
                    falseSerie.push(this.kcw[prop].false);
                }

                let series = [{name: 'true', data: trueSerie}, {name: 'false', data: falseSerie}];
                if (this._isMounted) {
                    this.setState({
                        dataKcw: series,
                        dataAuth: [
                            {name: 'ntlm', y: this.kcw.cw_auth['<ntlm/>']},
                            {name: 'kerberos', y: this.kcw.cw_auth['<kerberos/>']},
                            {name: 'disabled', y: this.kcw.cw_auth['<disabled/>']}]
                    });
                }
            })
            .catch(error => console.log(error));
    };

    fetchKernun = (date) => {
        this.setState({ loading: true });
        getCountKernunVersion(moment(date).format('YYYY-MM-DD'))
            .then((response) => {
                const data = response.data.data;
                const variantNames = Object.keys(data);
                let variantSeries = [];
                let graphs = [];
                variantNames.forEach(variantName => {
                    let versionSeries = [];
                    const versions = data[variantName];
                    let sum = 0;
                    versions.forEach(v => {
                        sum += v.count;
                        versionSeries.push({name: v.kernun_version, y: v.count})
                    });
                    variantSeries.push({name: variantName, y: sum});
                    const options = {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie',
                        },
                        title: { text: variantName},
                        tooltip: {pointFormat: '{series.name}:{point.y}<br/><b>{point.percentage:.1f}%</b>'},
                        plotOptions: {
                            pie: {
                                allowPointSelect: false,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false
                                },
                                showInLegend: true,
                                point: {
                                    events: {
                                        click: function () {
                                            alert(this.name);
                                        }
                                    }
                                }
                            }
                        },
                        series: [{name: 'Count', colorByPoint: true, data: versionSeries}]
                    };
                    graphs.push(
                        <div className="center-chart">
                        <HighchartsReact key={variantName}  highcharts={Highcharts} options={options}/>
                        </div>
                    );
                });
                if (this._isMounted) {
                    this.setState({
                        loading: false,
                        data: variantSeries,
                        graphs: graphs
                    });
                }
            })
            .catch(error => console.log(error));
    };

    render() {
        const options = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Kernun variants'
            },
            tooltip: {
                pointFormat: '{series.name}:{point.y}<br/><b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true,
                    point: {
                        events: {
                            click: function () {
                                alert('Category: ' + this.name);
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'Count',
                colorByPoint: true,
                data: this.state.data
            }]
        };

        const optionsAuth = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'cw_auth'
            },
            tooltip: {
                pointFormat: '{series.name}:{point.y}<br/><b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true,
                    point: {
                        events: {
                            click: function () {
                                alert('Category: ' + this.name);
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'Count',
                colorByPoint: true,
                data: this.state.dataAuth
            }]
        };

        const optionsKcw = {
            chart: {
                type: 'column',
            },
            title: {
                text: 'kcw functions'
            },
            xAxis: {
                categories: ['cw_antivirus','cw_auto_update', 'cw_dhcp_client','cw_dhcp_server','cw_hand_off',
                    'cw_https_insp', 'cw_sshd_enabled', 'cw_sshd_kernun']
            },
            yAxis: {
                title: {
                    text: 'Count'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name} </span>',
                pointFormat: '{point.y}<br/><b>Total</b>: {point.stackTotal:,.0f}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                    },
                    point: {
                        events: {
                            click: function () {
                                alert(this.category + this.series.name);
                            }
                        }
                    }
                }
            },
            series: this.state.dataKcw
        };

        return (
            <Fragment>
                <DatePicker defaultValue={moment()} format={dateFormat} onChange={this.onCalendar.bind(this)}/>
                <br/> <br/>
                <Spin spinning={this.state.loading}>
                    <div className="charts">
                        <div className="column-left">
                            <HighchartsReact highcharts={Highcharts} options={options}/>
                        </div>
                        <div className="column-center">
                            {this.state.graphs}
                            <div className="center-chart">
                                <HighchartsReact highcharts={Highcharts} options={optionsAuth}/>
                            </div>
                        </div>
                    </div><br/><br/>
                    <HighchartsReact highcharts={Highcharts} options={optionsKcw}/>
                </Spin>
            </Fragment>
        )
    }
}
export default Statistic;
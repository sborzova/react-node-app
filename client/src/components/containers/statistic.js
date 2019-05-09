import React, {Component, Fragment} from 'react';
import axios from "axios";
import {Spin} from "antd";
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import Highcharts from 'highcharts/highstock';
import { DatePicker } from 'antd';

const dateFormat = 'DD.MM.YYYY';

class Statistic extends Component {
    _isMounted = false;

    kcw = {
        cw_antivirus: { true: 0, false: 0},
        cw_auto_update: { true: 0, false: 0},
        cw_dhcp_client: { true: 0, false: 0},
        cw_dhcp_server: { true: 0, false: 0},
        cw_hand_off: { true: 0, false: 0},
        cw_https_insp: { true: 0, false: 0},
        cw_sshd_enabled: {true: 0, false: 0},
        cw_sshd_kernun: {true: 0, false: 0}
    };

    state = {
        loading : false,
        data: {},
        graphs: [],
        dataKcw: []
    };

    componentDidMount() {
        this._isMounted = true;
        this.fetchKernun(moment().format(dateFormat));
        this.fetchKcw(moment().format(dateFormat));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onCalendar(date, dateString){
        this.fetch(dateString);
        this.fetchKcw(dateString);
    }

    fetchKcw = (date) => {
        this.setState({ loading: true });
        axios.get(`/api/statistic/kcw`,
            {params: {date: moment(date).format('YYYY-MM-DD')}})
            .then((response) => {
                response.data.data.forEach(d => {
                        for (const prop in d) {
                            if (d.hasOwnProperty(prop) && this.kcw[prop]) {
                                if (d[prop] == 'true'){
                                    this.kcw[prop].true++;
                                }else if (d[prop] == 'false'){
                                    this.kcw[prop].false++;
                                }
                            }
                        }
                });
                let graphsKcw = [];
                let trueSerie = [];
                let falseSerie = [];
                for (const prop in this.kcw) {
                    trueSerie.push(this.kcw[prop].true);
                    falseSerie.push(this.kcw[prop].false);
                    const options = {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie',
                        },
                        title: { text: prop, margin: 0},
                        tooltip: {pointFormat: '{title.text}{series.name}:{point.y}<br/><b>{point.percentage:.1f}%</b>'},
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
                                            alert('Category: ' + this.name);
                                        }
                                    }
                                },
                                size: 80
                            }
                        },
                        series: [{name: 'Count', colorByPoint: true,
                            data: [{ name: 'True', y: this.kcw[prop].true}, {name:'False', y:this.kcw[prop].false}]}]
                    };
                }

                if (this._isMounted) {
                    this.setState({
                        graphsKcw: graphsKcw
                    });
                }
            })
            .catch(error => console.log(error));
    };

    fetchKernun = (date) => {
        this.setState({ loading: true });
        axios.get(`/api/statistic/kernun`,
            {params: {date: moment(date).format('YYYY-MM-DD')}})
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
                                allowPointSelect: true,
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

        const optionsKcw = {
            chart: {
                type: 'column',
            },
            title: {
                text: 'summary of hits'
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

        return (
            <Fragment>
                <DatePicker defaultValue={moment()} format={dateFormat} onChange={this.onCalendar.bind(this)}/>
                <br/> <br/>
                <Spin spinning={this.state.loading}>
                    <div className="charts">
                        <div className="column-left">
                            <HighchartsReact highcharts={Highcharts} options={options}/>
                        </div>
                        <div className="column-center">{this.state.graphs}</div>
                    </div><br/><br/>
                    <h1 style={{ textAlign: "center"}}>Kcw functions</h1><br/> <br/>
                    <HighchartsReact highcharts={Highcharts} options={optionsKcw}/>
                    <div>{this.state.graphsKcw}</div>
                </Spin>
            </Fragment>
        )
    }
}
export default Statistic;
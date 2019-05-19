import React, {Component} from 'react';
import {message, Spin} from "antd/lib/index";
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import Highcharts from 'highcharts/highstock';
import {getCountKcw} from "../services/api";
import {strings} from "../constants/strings";


class KernunKcw extends Component {
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
        kcwSeries: [],
        dataAuth: [],
    };

    componentDidMount() {
        this._isMounted = true;
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this._isMounted = false;
        this.props.onRef(undefined)
    }

    fetch = (date) => {
        this.setState({ loading: true});
        getCountKcw(moment(date, 'DD.MM.YYYY').format('YYYY-MM-DD'))
            .then((response) => {
                let data = response.data.data;
                if (data.length > 0){ data.forEach(d => {
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
                            loading: false,
                            kcwSeries: series,
                            dataAuth: [
                                {name: 'ntlm', y: this.kcw.cw_auth['<ntlm/>']},
                                {name: 'kerberos', y: this.kcw.cw_auth['<kerberos/>']},
                                {name: 'disabled', y: this.kcw.cw_auth['<disabled/>']}]
                        });
                    }}else{
                    this.setState({
                        loading: false,
                        kcwSeries: [],
                        dataAuth: []
                    })
                }

            })
            .catch(e => {
                message.error(strings.ERROR)
            });
    };

    render() {
        const optionsAuth = {
            chart: { type: 'pie' },
            title: { text: strings.CHART_KCW_AUTH_TITLE},
            tooltip: { pointFormat: '{series.name}:{point.y}<br/><b>{point.percentage:.1f}%</b>' },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true,
                    point: {
                        events: {
                            click: (e) => {
                                this.props.onClick('cw_auth', '<' + e.point.name +'/>');
                            }
                        }
                    }
                }
            },
            series: [{ name: strings.CHART_COUNT, data: this.state.dataAuth }]
        };

        const optionsKcw = {
            chart: { type: 'column' },
            title: { text: strings.CHART_KCW_FUNCTIONS_TITLE },
            xAxis: { categories: ['cw_antivirus','cw_auto_update', 'cw_dhcp_client','cw_dhcp_server','cw_hand_off',
                    'cw_https_insp', 'cw_sshd_enabled', 'cw_sshd_kernun'] },
            yAxis: { title: { text: strings.CHART_COUNT, moje: '' } },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name} </span>',
                pointFormat: '{point.y}<br/><b>' + strings.CHART_TOTAL +'</b>: {point.stackTotal:,.0f}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                    }
                }
            },
            series: this.state.kcwSeries
        };

        return (
            <Spin spinning={this.state.loading}>
                <HighchartsReact highcharts={Highcharts} options={optionsAuth}/>
                <HighchartsReact highcharts={Highcharts} options={optionsKcw}/>
            </Spin>
        )
    }
}
export default KernunKcw;
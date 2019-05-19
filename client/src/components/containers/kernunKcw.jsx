import React, {Component, Fragment} from 'react';
import {message, Spin} from "antd";
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import Highcharts from 'highcharts/highstock';
import { DatePicker } from 'antd';
import {
    getAllFeedbacksForKcwAuth,
    getAllFeedbacksForKcwFunction,
    getCountKcw,
} from "../../services/api";
import {strings} from "../../constants/strings";
import FeedbackTable from "./feedbacTable";
import KernunVariants from "./kernunVariants";
import KernunVersions from "./kernunVersions";

const dateFormat = 'DD.MM.YYYY';

class Statistic extends Component {
    _isMounted = false;
    colors = Highcharts.getOptions().colors;

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
        loadingTable: false,
        date: moment().format(dateFormat),
        graphs: [],
        dataKcw: [],
        dataAuth: [],
        feedback: [],
        saleTypeSeries: [],
        kernunVariantSeries: []
    };

    componentDidMount() {
        this._isMounted = true;
        this.kernunVariants.fetch(this.state.date)
        this.kernunVersions.fetch(this.state.date)
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onCalendar(date, dateString){
        this.setState({date: dateString});
        this.kernunVariants.fetch(dateString)
        this.kernunVersions.fetch(dateString)
    }

    fetchKcw = (date) => {
        this.setState({ loading: true });
        getCountKcw(moment(date, 'DD.MM.YYYY').format('YYYY-MM-DD'))
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
                            click: function () {
                                this.setState({ loadingTable: true });
                                getAllFeedbacksForKcwAuth(this.name)
                                    .then((response) => {
                                        const data = response.data;
                                        this.setState({
                                            loadingTable: false,
                                            feedback: data.data,
                                        });
                                    })
                                    .catch(e => {
                                        message.error(strings.ERROR)
                                    });
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
                    },
                    point: {
                        events: {
                            click: function (){
                                console.log(
                                    document.getElementsByClassName(
                                        'ant-calendar-picker-input')
                                        .item(0).getAttribute('value'));
                                this.setState({ loadingTable: true });
                                getAllFeedbacksForKcwFunction(this.category, this.series.name)
                                    .then((response) => {
                                        const data = response.data;
                                        this.setState({
                                            loadingTable: false,
                                            feedback: data.data,
                                        });
                                    })
                                    .catch(e => {
                                        message.error(strings.ERROR)
                                    });
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
                <br/>
                <KernunVariants onRef={ref => (this.kernunVariants = ref)}/>
                <KernunVersions onRef={ref => (this.kernunVersions = ref)}/>
                <HighchartsReact highcharts={Highcharts} options={optionsAuth}/>
                <div>
                    <HighchartsReact highcharts={Highcharts} options={optionsKcw}/>
                </div>
                <FeedbackTable feedback={this.state.feedback}/>
            </Fragment>
        )
    }
}
export default Statistic;
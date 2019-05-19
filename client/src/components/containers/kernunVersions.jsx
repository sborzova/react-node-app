import React, {Component} from 'react';
import {message, Spin} from "antd";
import moment from 'moment';
import Highcharts from 'highcharts/highstock';
import {
    getAllFeedbacksForKcwAuth,
    getCountKernunVersions,
} from "../../services/api";
import {strings} from "../../constants/strings";
import HighchartsReact from "highcharts-react-official/src/HighchartsReact";

class KernunVersions extends Component {
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
        graphs: [],
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
        this.setState({ loading: true });
        getCountKernunVersions(moment(date, 'DD.MM.YYYY').format('YYYY-MM-DD'))
            .then((response) => {
                const data = response.data.data;
                const kernunVariants = Object.keys(data);
                let graphs = [];
                kernunVariants.forEach(kernunVariant => {
                    let series = [];
                    const kernunversions = data[kernunVariant];
                    kernunversions.forEach(kernunVersion => {
                       series.push({name: kernunVersion.kernun_version, y: kernunVersion.count});
                    });

                    const options = {
                        chart: { type: 'pie' },
                        title: { text: kernunVariant},
                        tooltip: { pointFormat: '{series.name}:{point.y}<br/><b>{point.percentage:.1f}%</b>' },
                        plotOptions: {
                            pie: { dataLabels: { enabled: false },
                                    showInLegend: true,
                                    point: {
                                        events: {
                                            click: function () {
                                                getAllFeedbacksForKcwAuth(this.name)
                                                    .then((response) => {
                                                    })
                                                    .catch((e) => {
                                                        message.error(strings.ERROR)
                                                    });
                                            }
                                        }
                                    }
                            }
                        },
                        series: [{ name: strings.CHART_COUNT, data: series }]
                    };

                    graphs.push(<HighchartsReact highcharts={Highcharts} options={options}/>);
                });

                if (this._isMounted) {
                    this.setState({
                        loading: false,
                        graphs: graphs
                    });
                }
            })
            .catch(e => {
                message.error(strings.ERROR)
            });
    };

    render() {

        return (
            <Spin spinning={this.state.loading}>
                {this.state.graphs}
            </Spin>
        )
    }
}
export default KernunVersions;
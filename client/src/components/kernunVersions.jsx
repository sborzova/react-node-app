import React, {Component} from 'react';
import {message, Spin} from "antd/lib/index";
import moment from 'moment';
import Highcharts from 'highcharts/highstock';
import {
    getCountKernunVersions,
} from "../services/api";
import {strings} from "../constants/strings";
import HighchartsReact from "highcharts-react-official/src/HighchartsReact";

class KernunVersions extends Component {
    _isMounted = false;

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
                       series.push({
                           name: kernunVersion.kernun_version,
                           y: kernunVersion.count,
                           kernunVariant: kernunVariant });
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
                                            click: (e) => {
                                               this.props.onClick(e.point.kernunVariant, e.point.name);
                                            }
                                        }
                                    }
                            }
                        },
                        series: [{ name: strings.CHART_COUNT, data: series }]
                    };

                    graphs.push(
                        <div key={kernunVariant} style={{width:'35%', float:'left'}}>
                        <HighchartsReact highcharts={Highcharts} options={options} />
                        </div>
                    );
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
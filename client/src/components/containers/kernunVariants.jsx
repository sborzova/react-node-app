import React, {Component} from 'react';
import {message, Spin} from "antd";
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import Highcharts from 'highcharts/highstock';
import {
    getCountKernunVariants
} from "../../services/api";
import {strings} from "../../constants/strings";

const dateFormat = 'DD.MM.YYYY';

class KernunVariants extends Component {
    _isMounted = false;
    colors = Highcharts.getOptions().colors;

    state = {
        loading : false,
        date: this.props.date,
        saleTypeSeries: [],
        kernunVariantSeries: []
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
        getCountKernunVariants(moment(date, dateFormat).format('YYYY-MM-DD'))
            .then((response) => {
                const data = response.data.data;
                const saleTypes = Object.keys(data);
                let saleTypesSeries = [];
                let kernunVariantSeries = [];
                let colorIndex = 0;
                saleTypes.forEach(saletype => {
                    let sumSaleType = 0;
                    const array = data[saletype];
                    const kernunVariants = Object.keys(array);

                    kernunVariants.forEach(kernunVariant => {
                        let sumKernunVariant = 0;
                        const arrayKernun = array[kernunVariant];

                        arrayKernun.forEach(object => {
                            sumSaleType += object.count;
                            sumKernunVariant += object.count;
                        });
                        kernunVariantSeries.push({
                            name: kernunVariant, y: sumKernunVariant,
                            saleType: saletype,
                            color: this.colors[colorIndex]});
                        colorIndex++;
                    });
                    saleTypesSeries.push({name: saletype, y: sumSaleType, color: this.colors[colorIndex]});
                    colorIndex++;
                });

                if (this._isMounted) {
                    this.setState({
                        loading: false,
                        saleTypeSeries: saleTypesSeries,
                        kernunVariantSeries: kernunVariantSeries,
                    });
                }
            })
            .catch((e) => {
                message.error(strings.ERROR)
            });
    };

    render() {

        const options = {
            chart: { type: 'pie' },
            title: { text: strings.CHART_KERNUN_VARIANTS_TITLE },
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
                                if (e.point.options.saleType){
                                    this.props.onClick(e.point.options.saleType, e.point.options.name);
                                }else {
                                    this.props.onClick(e.point.options.name, undefined);
                                }
                            }
                        }
                    }
                }
            },
            series: [{
                name: strings.CHART_COUNT,
                data: this.state.saleTypeSeries,
                size: '60%',
            }, {
                name: strings.CHART_COUNT,
                data: this.state.kernunVariantSeries,
                size: '80%',
                innerSize: '60%',
                id: 'versions'
            }]
        };

        return (
            <Spin spinning={this.state.loading}>
                <HighchartsReact  highcharts={Highcharts} options={options}/>
            </Spin>
        )
    }
}
export default KernunVariants;
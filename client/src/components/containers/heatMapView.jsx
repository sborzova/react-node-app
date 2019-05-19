import React, {Component} from 'react';

import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highmaps';
import {strings} from "../../constants/strings";

class HeatMapView extends Component{
    render () {
        const opt = {
            chart : { type: 'heatmap' },
            title : { text:  this.props.title},
            xAxis : {
                categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            },
            yAxis : { categories: this.props.yCategories,  title: strings.CHART_MONTHS },
            colorAxis : {
                min: this.props.min,
                stops: [
                    [0, '#FFFF4D'],
                    [0.5, '#FFAE19'],
                    [0.9, '#c4463a']
                ],
            },
            tooltip : {
                formatter: function () {
                    return this.point.name + '<br/>'  + strings.CHART_COUNT + ':<b>' +
                            this.point.value + '</b>';
                }
            },
            series : [{ name: 'Count', data: this.props.data }]
        };

        return (
            <HighchartsReact
            highcharts={Highcharts}
            options={opt}/>)
    }
}

export default HeatMapView;
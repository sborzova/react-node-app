import React, {Component} from 'react';
import axios from "axios";
import {Spin} from 'antd';

import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highmaps';
import moment from 'moment';

class Dev extends Component{
    state = {
        loading: false,
        data: [],
        categories: []
    };

    mapper = new Map();

    componentDidMount(){
        let date = new Date();
        let categories = [];
        categories.push(moment(date).format('MMM YYYY'));
        for (let i=0; i<13; i++){
            this.mapper.set(moment(date).month()+'-'+ moment(date).year(), i);
            date = moment(date).subtract(1, "month");
            categories.push(date.format('MMM YYYY'));
        }
        this.setState({categories:categories});
        this.fetch(this.state.period);
    };

    handlePeriodChange = (e) => {
        this.fetch(e.target.value);
    };

    fetch = () => {
        this.setState({ loading: true });
        axios.get(`/api/feedback/year`)
            .then((response) => {
                let days = [];
                const array = response.data.data;
                array.forEach(e => {
                    days.push(
                        [moment(e.date).date()-1,this.mapper.get(moment(e.date).month()+'-'+ moment(e.date).year()),e.count]);
                });
                this.setState({
                    loading: false,
                    data:days
                })
            })
            .catch(error => console.log(error));
    };
    render () {
        const opt = {
            chart : {
                type: 'heatmap',
            },
             title : {
                text: 'year summary'
        },
            xAxis : {
                categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        },
            yAxis : {
                categories: this.state.categories,
            title: 'Months'
        },
            colorAxis : {
            min: 60,
            minColor: '#FFFFFF',
            maxColor: Highcharts.getOptions().colors[0]
        },
            legend : {
            margin: 10,
            verticalAlign: 'bottom',
        },
            tooltip : {
            formatter: function () {
                return '<b>' + this.point.value+ '<br>' + this.series.xAxis.categories[this.point.x] + '.'
                    + this.series.yAxis.categories[this.point.y] + '</b>';
            }
        },
            series : [{
            name: 'Count',
            borderWidth: 1,
            data: this.state.data,
            dataLabels: {
                enabled: true,
                color: '#000000'
            }
        }]

    };

        return (
            <Spin spinning={this.state.loading}>
            <HighchartsReact
                highcharts={Highcharts}
                options={opt}/>
            </Spin>)
    }
}



export default Dev;
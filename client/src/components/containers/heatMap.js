import React, {Component} from 'react';
import {Spin} from 'antd';

import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highmaps';
import moment from 'moment';
import {getCountFeedback} from "../../services/api";

class HeatMap extends Component{
    state = {
        loading: false,
        data: [],
        categories: [],
        min: 0,
    };

    mapper = new Map();
    _isMounted = false;

    componentDidMount(){
        const min = this.props.type == 'year' ? 60 : 1;
        this._isMounted = true;
        let date = new Date();
        let categories = [];
        categories.push(moment(date).format('MMM YYYY'));
        for (let i=0; i<13; i++){
            this.mapper.set(moment(date).month()+'-'+ moment(date).year(), i);
            date = moment(date).subtract(1, "month");
            categories.push(date.format('MMM YYYY'));
        }
        this.setState({categories:categories, min: min});
        this.fetch();
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    fetch = () => {
        this.setState({ loading: true });
        getCountFeedback(this.props.type)
            .then((response) => {
                let days = [];
                const array = response.data.data;
                array.forEach(e => {
                    days.push({
                        x: moment(e.date).date()-1,
                        y: this.mapper.get(moment(e.date).month()+'-'+ moment(e.date).year()),
                        value: e.count,
                        name: moment(e.date).format('dd DD.MM.YYYY')});
                });
                if (this._isMounted){
                    this.setState({
                        loading: false,
                        data:days
                    })
                }
            })
            .catch(error => console.log(error));
    };

    render () {
        const opt = {
            chart : { type: 'heatmap' },
            title : { text: 'year summary of feedback' },
            xAxis : {
                categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            },
            yAxis : { categories: this.state.categories,  title: 'Months' },
            colorAxis : {
                min: this.state.min,
                stops: [
                    [0, '#FFFF4D'],
                    [0.5, '#FFAE19'],
                    [0.9, '#c4463a']
                ],
            },
            tooltip : {
                formatter: function () {
                    return this.point.name + '<br/>' + 'Count: ' + '<b>' +
                            this.point.value + '</b>';
                }
            },
            series : [{ name: 'Count', data: this.state.data }]

        };

        return (
            <Spin spinning={this.state.loading}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={opt}/>
            </Spin>)
    }
}

export default HeatMap;
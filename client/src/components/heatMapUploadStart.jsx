import React, {Component} from 'react';
import {message, Spin} from 'antd/lib/index';

import moment from 'moment';
import {getCountFeedback} from "../services/api";
import {strings} from "../constants/strings";
import HeatMapView from "./heatMapView";

class HeatMapUploadStart extends Component{
    state = {
        loading: false,
        data: [],
        categories: [],
        min: 0,
    };

    mapper = new Map();
    _isMounted = false;

    componentDidMount(){
        const min = this.props.type.includes('all/year') ? 60 : 1;
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
            .catch(e => {
                message.error(strings.ERROR)
            });
    };

    render () {
        return (
            <Spin spinning={this.state.loading}>
                <HeatMapView
                    yCategories={this.state.categories}
                    data={this.state.data}
                    min={this.state.min}
                    title={this.props.title}/>
            </Spin>)
    }
}

export default HeatMapUploadStart;
import React, {Component} from 'react';
import {Spin, message} from 'antd';

import moment from 'moment';
import { getCountProcessed} from "../../services/api";
import HeatMapView from "./heatMapView";

class HeatMapProcessed extends Component{
    state = {
        loading: false,
        data: [],
        categories: [],
    };

    mapper = new Map();
    _isMounted = false;

    componentDidMount(){
        this._isMounted = true;
        let date = new Date();
        let categories = [];
        categories.push(moment(date).format('MMM YYYY'));
        for (let i=0; i<13; i++){
            this.mapper.set(moment(date).month()+'-'+ moment(date).year(), i);
            date = moment(date).subtract(1, "month");
            categories.push(date.format('MMM YYYY'));
        }
        this.setState({categories:categories});
        this.fetch();
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    fetch = () => {
        this.setState({ loading: true });
        getCountProcessed()
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
            .catch(error => {
                    console.log(error)
            });
    };

    render () {
        return (
            <Spin spinning={this.state.loading}>
                <HeatMapView
                    yCategories={this.state.categories}
                    data={this.state.data}
                    min={60}
                    title={this.props.title}/>
                mountNode
            </Spin>)
    }
}

export default HeatMapProcessed;
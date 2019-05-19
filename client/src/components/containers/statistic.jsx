import React, {Component, Fragment} from 'react';
import moment from 'moment';
import {DatePicker, Spin} from 'antd';

import FeedbackTable from "./feedbacTable";
import KernunVariants from "./kernunVariants";
import KernunVersions from "./kernunVersions";
import KernunKcw from "./kernunKcw";
import {
    getAllFeedbacksForKcwAuth,
    getAllFeedbacksForKernunVariant, getAllFeedbacksForKernunVersion,
    getAllFeedbacksForSaleType
} from "../../services/api";

const dateFormat = 'DD.MM.YYYY';

class Statistic extends Component {
    _isMounted = false;
    state = {
        date: moment().format(dateFormat),
        feedbacks: [],
        loading: false
    };

    componentDidMount = () => {
        this._isMounted = true;
        this.kernunVariants.fetch(this.state.date);
        this.kernunVersions.fetch(this.state.date);
        this.kcw.fetch(this.state.date);
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    onCalendar =(date, dateString)=>{
        this.setState({date: dateString});
        this.kernunVariants.fetch(dateString);
        this.kernunVersions.fetch(dateString);
        this.kcw.fetch(dateString);
    };

    fetchFeedbacksKernunVariant =(saleType, variant) => {
        this.setState({loading: true});
        if (variant){
            getAllFeedbacksForKernunVariant(variant, saleType, this.state.date)
                .then(response => {
                    if (this._isMounted){
                        this.setState({
                            loading: false,
                            feedbacks: response.data.data
                        })
                    }
                });
        }else {
            getAllFeedbacksForSaleType(saleType, this.state.date)
                .then(response => {
                    if (this._isMounted){
                        this.setState({
                            loading: false,
                            feedbacks: response.data.data
                        })
                    }
                });
        }
    };

    fetchFeedbacksKernunVersions =(variant, version) => {
        this.setState({loading: true});
        getAllFeedbacksForKernunVersion(variant, version, this.state.date)
            .then(response => {
                if (this._isMounted){
                    this.setState({
                        loading: false,
                        feedbacks: response.data.data
                    })
                }
            });
    };

    fetchFeedbacksKcwAuth = (property, value) => {
        this.setState({loading: true});
        getAllFeedbacksForKcwAuth(value, this.state.date)
            .then(response => {
                if (this._isMounted){
                    this.setState({
                        loading: false,
                        feedbacks: response.data.data
                    })
                }
            });
    };

    render() {

        return (
            <Fragment>
                <DatePicker defaultValue={moment()} format={dateFormat} onChange={this.onCalendar.bind(this)}/>
                <br/>
                <div className="row">
                    <div className="column">
                        <KernunVariants
                            onClick={this.fetchFeedbacksKernunVariant}
                            onRef={ref => (this.kernunVariants = ref)}/>
                    </div>
                    <div className="column">
                        <KernunVersions
                            onClick={this.fetchFeedbacksKernunVersions}
                            onRef={ref => (this.kernunVersions = ref)}/>
                    </div>
                </div>
                <KernunKcw
                    onClick={this.fetchFeedbacksKcwAuth}
                    onRef={ref => (this.kcw = ref)}/>
                <Spin spinning={this.state.loading}>
                    <FeedbackTable feedback={this.state.feedbacks}/>
                </Spin>
            </Fragment>
        )
    }
}
export default Statistic;
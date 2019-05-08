import React, {Component, Fragment} from 'react';
import axios from "axios";
import {Radio} from "antd";

import HighchartsReact from 'highcharts-react-official';

import moment from 'moment';
import Highcharts from 'highcharts/highstock';
import HeatMap from "./HeatMap";
import { DatePicker } from 'antd';

const dateFormat = 'DD.MM.YYYY';


class Statistics extends Component {

    render() {
        return (
            <Fragment>
                <DatePicker defaultValue={moment()} format={dateFormat} />
            </Fragment>
        )
    }
}
export default Statistics;
import React, {Component} from 'react';
import {Table, Tag} from 'antd';
import {Link} from "react-router-dom";
import axios from "axios";

import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

const options = {
    title: {
        text: 'My stock chart'
    },
    series: [{
        data: [1, 2, 3]
    }]
}

const Dev = () => <HighchartsReact
    highcharts={Highcharts}
    constructorType={'stockChart'}
    options={options}
/>

export default Dev;
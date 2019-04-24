import React, { Component} from 'react';
import axios from 'axios';

class RecordDetail extends Component {
    state = {
        data: {}
    };


    componentDidMount(){
        this.fetch();
    }

    fetch = (params = {}) => {
        return axios.get(`/api/news/records/detail/${this.props.match.params.id}`)
            .then( (response) => {
                const data = response.data;
                this.setState({
                    loading: false,
                    data: data.data[0],
                });
            })
            .catch( (e) => console.log(e))
    };

    render(){
        return (
            <div>
                <div>{this.state.data.fa_id}</div>
                <div>{this.state.data.determined_customer}</div>
                <div>{this.state.data.license}</div>
            </div>
        )
    }
}

export default RecordDetail;
import React, {Component} from 'react';
import {Table, Tag, Input, Button, Icon,} from 'antd';
import axios from "axios";
import Highlighter from 'react-highlight-words';
import moment from 'moment';


class Licenses extends Component {
    _isMounted = false;

    state = {
        customers: [],
        pagination: {},
        loading: false,
        redirect: false,
        redirectTo: null,
        searchText: '',
    };

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
                             setSelectedKeys, selectedKeys, confirm, clearFilters,
                         }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => { this.searchInput = node; }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    componentDidMount(){
        this._isMounted = true;
        this.fetch();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    fetch = (params = {}) => {
        this.setState({ loading: true });
        const results = 10;
        axios.get(`/api/licenses`, )
            .then((response) => {
                const data = response.data;
                const pagination = { ...this.state.pagination };
                pagination.total = data.data.length;
                if (this._isMounted) {
                    this.setState({
                        loading: false,
                        customers: data.data,
                        pagination,
                    });
                }
            })
            .catch( (e) => console.log(e))
    };

    render() {
        const columns = [
            {
                title: 'Customer',
                dataIndex: 'determined_customer',
                width: '16%',
                ...this.getColumnSearchProps('determined_customer'),
            },
             {
                title: 'Expiration',
                dataIndex: 'license.expiration',
                width: '10%',
                defaultSortOrder: 'descend',
                //sorter: (a, b) => a.license.expiration.localeCompare(b.license.expiration),
                 render: (datetime) =>{
                     if (datetime !== 'undefined' && datetime !== 'unlimited'){
                         return <div>{moment(datetime).format('L')}</div>
                     }}
            },
            {
                title: 'Upgrade',
                dataIndex: 'license.upgrade',
                width: '10%',
                defaultSortOrder: 'descend',
                //sorter: (a, b) => a.license.expiration.localeCompare(b.license.expiration),
                render: (datetime) =>{
                    if (datetime !== 'undefined' && datetime !== 'unlimited'){
                        return <div>{moment(datetime).format('L')}</div>
                    }}
            },
            {
                title: 'Sale',
                dataIndex: 'license.saleType',
                width: '5%',
                filters: [
                    { text: 'sale', value: 'sale' },
                    { text: 'rental', value: 'rental' },
                ],
                onFilter: (value, record) => {if (record.license && record.license.saleType){return record.license.saleType.includes(value)}},
                render: (saleType) => {
                    if (saleType){
                        const color = saleType == 'sale' ? 'yellow' : 'blue';
                        return <Tag color={color} key={saleType}>{saleType}</Tag>
                    }}
            },
            {
                title: 'Type',
                dataIndex: 'license.licenseType',
                width: '5%',
                filters: [
                    { text: 'edu', value: 'edu' },
                    { text: 'test', value: 'test' },
                    { text: 'nfr', value: 'nfr' },
                ],
                onFilter: (value, record) => {if (record.license && record.license.licenseType){return record.license.licenseType.includes(value)}},
                render: (licenseType) => {
                    if (licenseType){
                        let color;
                        switch(licenseType) {
                            case 'edu':
                                color = 'orange';
                                break;
                            case 'test':
                                color = 'green';
                                break;
                            case 'nfr':
                                color = 'red';
                                break;
                            default:
                                break
                        }
                        return <Tag color={color} key={licenseType}>{licenseType}</Tag>
                    }}
            },{
                title: 'Kernun variant',
                dataIndex: 'device.kernun_variant',
                width: '10%',
                filters: [
                    { text: 'kcw', value: 'kernun_clear_web' },
                    { text: 'utm', value: 'kernun' },
                    { text: 'ovpn', value: 'kernun_ovpn' },
                ],
                onFilter: (value, record) => {if (record.kernun_variant){
                    return record.kernun_variant == value}},
                render: (ker_var) => {
                    if (ker_var){
                        let color;
                        switch(ker_var) {
                            case 'kcw':
                                color = 'orange';
                                break;
                            case 'utm':
                                color = 'green';
                                break;
                            case 'ovpn':
                                color = 'red';
                                break;
                            default:
                                break
                        }
                        return <Tag color={color} key={ker_var}>{ker_var}</Tag>
                    }}
            },

        ];
        return (
            <Table
                columns={columns}
                rowKey={record => record.fa_id}
                dataSource={this.state.customers}
                loading={this.state.loading}
            />

        )
    }
}

export default Licenses;
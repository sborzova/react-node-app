import React, {Component} from 'react';
import {Table, Tag, Input, Button, Icon,} from 'antd';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import {Link} from "react-router-dom";
import {getAllLicenses} from "../../services/api";

class LicenseList extends Component {
    _isMounted = false;

    state = {
        customers: [],
        loading: false,
        redirect: false,
        redirectTo: null,
        searchText: '',
    };

    componentDidMount(){
        this._isMounted = true;
        this.fetch();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

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


    fetch = () => {
        this.setState({ loading: true });
        getAllLicenses()
            .then((response) => {
                if (this._isMounted) {
                    this.setState({
                        loading: false,
                        customers: response.data.data,
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
                ...this.getColumnSearchProps('determined_customer'),
                render: (customer) =>
                    <div>
                        <Link to={`/customers/detail/${customer}`}>{customer}</Link>

                    </div>
            },
            {
                title: 'Ident',
                dataIndex: 'ident',
            },{
                title: 'Serial',
                dataIndex: 'serial',
                render: (serial) =>
                    <div>
                        <Link to={`/licenses/detail/${serial}`}>{serial}</Link>
                    </div>
            },
             {
                title: 'Expiration',
                dataIndex: 'expiration',
                 render: (datetime) => {
                     if (datetime !== '∞' && datetime !== 'unlimited'){
                         let className = '';
                         if (moment(datetime).isBefore(moment())){
                             className = 'font-red'
                         }else if (moment().diff(moment(datetime)) <= 7){
                             className = 'font-orange'
                         }else if (moment().diff(moment(datetime)) <= 31){
                             className = 'font-yellow'
                         }
                         return <div className={className}>{moment(datetime).format('L')}</div>
                     }else{
                         return <div className="infinity">∞</div>
                     }}
            },
            {
                title: 'Upgrade',
                dataIndex: 'upgrade',
                defaultSortOrder: 'descend',
                //sorter: (a, b) => a.license.expiration.localeCompare(b.license.expiration),
                render: (datetime) => {
                    if (datetime !== 'undefined' && datetime !== 'unlimited'){
                        let className = '';
                        if (moment(datetime).isBefore(moment())){
                            className = 'font-red'
                        }else if (moment(datetime).diff(moment(), 'days') <= 7){
                            className = 'font-orange'
                        }else if (moment(datetime).diff(moment(), 'days') <= 31){
                            className = 'font-yellow'
                        }
                        return <div className={className}>{moment(datetime).format('L')}</div>
                    }}
            },
            {
                title: 'Sale',
                dataIndex: 'saleType',
                filters: [
                    { text: 'sale', value: 'sale' },
                    { text: 'rental', value: 'rental' },
                ],
                onFilter: (value, record) => {if (record.saleType){return record.saleType.includes(value)}},
                render: (saleType) => {
                    if (saleType){
                        const color = saleType == 'sale' ? 'yellow' : 'blue';
                        return <Tag color={color} key={saleType}>{saleType}</Tag>
                    }}
            },
             {
                title: 'Type',
                dataIndex: 'licenseType',
                filters: [
                    { text: 'edu', value: 'edu' },
                    { text: 'test', value: 'test' },
                    { text: 'nfr', value: 'nfr' },
                ],
                onFilter: (value, record) => {if (record && record.licenseType){return record.licenseType.includes(value)}},
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
                dataIndex: 'kernun_variant',
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
            {
                title: 'Upload start',
                dataIndex: 'upload_start',
                render: (datetime) =>
                    <div>{moment(datetime).format('L') + " " + moment(datetime).format('LTS')}</div>
            },
            {
                title: 'Fa id',
                dataIndex: 'fa_id',
                width: '5%',
                render: (id) =>
                    <div>
                        <Link to={`/feedback/detail/${id}`}>{id}</Link>
                    </div>
            },
        ];
        return (
            <Table
                columns={columns}
                rowKey={record => record.serial}
                dataSource={this.state.customers}
                loading={this.state.loading}
            />
        )
    }
}

export default LicenseList;
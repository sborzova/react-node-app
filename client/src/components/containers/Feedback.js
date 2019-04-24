import React, { Component } from 'react';
import axios from 'axios';
import {Tabs} from "antd";
import moment from 'moment';

const { TabPane } = Tabs;

class Feedback extends Component {
    state = {
        feedback: {},
        device: {},
        deviceStatus: {},
        reporter: {},
        license: {},
        kcwFunction: {}
    };

    componentDidMount(){
        this.fetch();
    }

    fetch = () => {
        return axios.get(`/api/feedback/detail/${this.props.match.params.id}`)
            .then( (response) => {
                const data = response.data;
                this.setState({
                    loading: false,
                    feedback: data.data[0],
                    device: data.data[0].device,
                    deviceStatus: data.data[0].deviceStatus,
                    reporter: data.data[0].reporter,
                    license: data.data[0].license,
                    kcwFunction: data.data[0].kcwFunction
                });
            })
            .catch( (e) => console.log(e))
    };

    render(){
        let expiration = this.state.license.expiration;
        if (expiration !== 'undefined' && expiration !== 'unlimited'){
            expiration = moment(expiration).format('L');
        }

        let upgrade = this.state.license.upgrade;
        if (upgrade !== 'undefined' && upgrade !== 'unlimited'){
            upgrade = moment(upgrade).format('L');
        }

        return (
            <div>
                <h1>Feedback detail</h1>
                <Tabs defaultActiveKey="1" size="small">
                    <TabPane tab="Basic info" key="1">
                        <table className="table-vertical">
                            <tbody>
                            <tr>
                                <th>fa_id</th>
                                <td>{this.state.feedback.fa_id}</td>
                            </tr>
                            <tr>
                                <th>determined_customer</th>
                                <td>{this.state.feedback.determined_customer}</td>
                            </tr>
                            <tr>
                                <th>domains</th>
                                <td>{parseInt(this.state.feedback.domains).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>feedback_hostname</th>
                                <td>{this.state.feedback.feedback_hostname}</td>
                            </tr>
                            <tr>
                                <th>feedback_ip</th>
                                <td>{this.state.feedback.feedback_ip}</td>
                            </tr>
                            <tr>
                                <th>fn</th>
                                <td>{this.state.feedback.fn}</td>
                            </tr>
                            <tr>
                                <th>hits</th>
                                <td>{parseInt(this.state.feedback.hits).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>size</th>
                                <td>{parseInt(this.state.feedback.size).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>processed</th>
                                <td>{moment(this.state.feedback.processed).format('DD.MM.YYYY HH:mm:ss')}</td>
                            </tr>
                            <tr>
                                <th>upload_start</th>
                                <td>{this.state.feedback.upload_start != null && this.state.feedback.upload_start !== '' ?
                                    moment(this.state.feedback.upload_start).format('DD.MM.YYYY HH:mm:ss'):''}</td>
                            </tr>
                            <tr>
                                <th>upload_finish</th>
                                <td>{this.state.feedback.upload_finish != null && this.state.feedback.upload_finish !== '' ?
                                    moment(this.state.feedback.upload_finish).format('DD.MM.YYYY HH:mm:ss'):''}</td>
                            </tr>
                            </tbody>
                        </table>
                    </TabPane>
                    <TabPane tab="License" key="2">
                        <table className="table-vertical">
                            <tbody>
                            <tr>
                                <th>ident</th>
                                <td>{this.state.license.ident}</td>
                            </tr>
                            <tr>
                                <th>customer</th>
                                <td>{this.state.license.customer}</td>
                            </tr>
                            <tr>
                                <th>serial</th>
                                <td>{this.state.license.serial}</td>
                            </tr>
                            <tr>
                                <th>devcount</th>
                                <td>{this.state.license.devcount}</td>
                            </tr>
                            <tr>
                                <th>hw</th>
                                <td>{this.state.license.hw}</td>
                            </tr>
                            <tr>
                                <th>expiration</th>
                                <td>{expiration}</td>
                            </tr>
                            <tr>
                                <th>upgrade</th>
                                <td>{upgrade}</td>
                            </tr>
                            <tr>
                                <th>group_type</th>
                                <td>{this.state.license.group_type}</td>
                            </tr>
                            </tbody>
                        </table>
                    </TabPane>
                    <TabPane tab="Device" key="3">
                        <table className="table-vertical">
                            <tbody>
                            <tr>
                                <th>cpu_model</th>
                                <td>{this.state.device.cpu_model}</td>
                            </tr>
                            <tr>
                                <th>cpu_number</th>
                                <td>{this.state.device.cpu_number}</td>
                            </tr>
                            <tr>
                                <th>dmi_product</th>
                                <td>{this.state.device.dmi_product}</td>
                            </tr>
                            <tr>
                                <th>hostid</th>
                                <td>{this.state.device.hostid}</td>
                            </tr>
                            <tr>
                                <th>hostname</th>
                                <td>{this.state.device.hostname}</td>
                            </tr>
                            <tr>
                                <th>kernun_variant</th>
                                <td>{this.state.device.kernun_variant}</td>
                            </tr>
                            <tr>
                                <th>kernun_version</th>
                                <td>{this.state.device.kernun_version}</td>
                            </tr>
                            <tr>
                                <th>vm_guest</th>
                                <td>{this.state.device.vm_guest}</td>
                            </tr>
                            </tbody>
                        </table>
                    </TabPane>
                    <TabPane tab="Device status" key="4">
                        <table className="table-vertical">
                            <tbody>
                            <tr>
                                <th>uptime</th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.uptime}</td>
                            </tr>
                            <tr>
                                <th>disk_space</th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.disk_space}</td>
                            </tr>
                            <tr>
                                <th>system_table</th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.system_table}</td>
                            </tr>
                            <tr>
                                <th>vm_stat</th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.vm_stat}</td>
                            </tr>
                            <tr>
                                <th>core_dumps</th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.core_dumps}</td>
                            </tr>
                            <tr>
                                <th>rrd_proxies</th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.rrd_proxies}</td>
                            </tr>
                            <tr>
                                <th>n_panics</th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.n_panics}</td>
                            </tr>
                            <tr>
                                <th>n_aborts</th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.n_aborts}</td>
                            </tr>
                            </tbody>
                        </table>
                    </TabPane>
                    <TabPane tab="Reporter" key="5">
                        <table className="table-vertical">
                            <tbody>
                            <tr>
                                <th>reporter_min_time</th>
                                <td>{this.state.reporter && this.state.reporter.reporter_min_time != null && this.state.reporter.reporter_min_time !== '' ?
                                    moment(this.state.reporter.reporter_min_time).format('DD.MM.YYYY HH:mm:ss'):''}</td>
                            </tr>
                            <tr>
                                <th>reporter_max_time</th>
                                <td>{this.state.reporter && this.state.reporter.reporter_max_time != null && this.state.reporter.reporter_max_time !== '' ?
                                    moment(this.state.reporter.reporter_max_time).format('DD.MM.YYYY HH:mm:ss'):''}</td>
                            </tr>
                            <tr>
                                <th>reporter_users</th>
                                <td>{this.state.reporter && parseInt(this.state.reporter.reporter_users).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>reporter_clients</th>
                                <td>{this.state.reporter && parseInt(this.state.reporter.reporter_clients).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>reporter_cw_categorized</th>
                                <td>{this.state.reporter && parseInt(this.state.reporter.reporter_cw_categorized).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>reporter_cw_total</th>
                                <td>{this.state.reporter && parseInt(this.state.reporter.reporter_cw_total).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>reporter_web_categorized</th>
                                <td>{this.state.reporter && parseInt(this.state.reporter.reporter_web_categorized).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>reporter_web_total</th>
                                <td>{this.state.reporter && parseInt(this.state.reporter.reporter_web_total).toLocaleString()}</td>
                            </tr>
                            </tbody>
                        </table>
                    </TabPane>
                    <TabPane tab="KCW function" key="6">
                        <table className="table-vertical">
                            <tbody>
                            <tr>
                                <th>cw_deployment</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_deployment}</td>
                            </tr>
                            <tr>
                                <th>cw_dhcp_client</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_dhcp_client}</td>
                            </tr>
                            <tr>
                                <th>cw_netif_devices</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_netif_devices}</td>
                            </tr>
                            <tr>
                                <th>cw_time_zone</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_time_zone}</td>
                            </tr>
                            <tr>
                                <th>cw_sshd_enabled</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_sshd_enabled}</td>
                            </tr>
                            <tr>
                                <th>cw_sshd_kernun</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_sshd_kernun}</td>
                            </tr>
                            <tr>
                                <th>cw_auto_update</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_auto_update}</td>
                            </tr>
                            <tr>
                                <th>cw_log_rotation</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_log_rotation}</td>
                            </tr>
                            <tr>
                                <th>cw_proxy_lang</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_proxy_lang}</td>
                            </tr>
                            <tr>
                                <th>cw_hand_off</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_hand_off}</td>
                            </tr>
                            <tr>
                                <th>cw_dhcp_server</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_dhcp_server}</td>
                            </tr>
                            <tr>
                                <th>cw_https_insp</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_https_insp}</td>
                            </tr>
                            <tr>
                                <th>cw_auth</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_auth}</td>
                            </tr>
                            <tr>
                                <th>cw_antivirus</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_antivirus}</td>
                            </tr>
                            </tbody>
                        </table>
                    </TabPane>

                </Tabs>
            </div>
        )
    }
}

export default Feedback;
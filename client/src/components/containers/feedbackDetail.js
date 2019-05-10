import React, { Component } from 'react';
import {Tabs} from "antd";
import moment from 'moment';
import {getFeedback} from "../../services/api";
import {strings} from "../../constants/strings";

const { TabPane } = Tabs;

class FeedbackDetail extends Component {
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
        getFeedback(this.props.match.params.id)
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
                                <th>{strings.FB_DETAIL_FA_ID}</th>
                                <td>{this.state.feedback.fa_id}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_DETERMINED_CUSTOMER}</th>
                                <td>{this.state.feedback.determined_customer}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_DOMAINS}</th>
                                <td>{parseInt(this.state.feedback.domains).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_FB_HOSTNAME}</th>
                                <td>{this.state.feedback.feedback_hostname}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_FB_IP}</th>
                                <td>{this.state.feedback.feedback_ip}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_FN}</th>
                                <td>{this.state.feedback.fn}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_HITS}</th>
                                <td>{parseInt(this.state.feedback.hits).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_SIZE}</th>
                                <td>{parseInt(this.state.feedback.size).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_PROCESSED}</th>
                                <td>{moment(this.state.feedback.processed).format('DD.MM.YYYY HH:mm:ss')}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_UPLOAD_START}</th>
                                <td>{this.state.feedback.upload_start != null && this.state.feedback.upload_start !== '' ?
                                    moment(this.state.feedback.upload_start).format('DD.MM.YYYY HH:mm:ss'):''}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_UPLOAD_FINISH}</th>
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
                                <th>{strings.FB_DETAIL_IDENT}</th>
                                <td>{this.state.license.ident}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_CUSTOMER}</th>
                                <td>{this.state.license.customer}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_SERIAL}</th>
                                <td>{this.state.license.serial}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_DEVCOUNT}</th>
                                <td>{this.state.license.devcount}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_HW}</th>
                                <td>{this.state.license.hw}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_EXPIRATION}</th>
                                <td>{expiration}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_UPGRADE}</th>
                                <td>{upgrade}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_GROUP_TYPE}</th>
                                <td>{this.state.license.group_type}</td>
                            </tr>
                            </tbody>
                        </table>
                    </TabPane>
                    <TabPane tab="Device" key="3">
                        <table className="table-vertical">
                            <tbody>
                            <tr>
                                <th>{strings.FB_DETAIL_CPU_MODEL}</th>
                                <td>{this.state.device.cpu_model}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_CPU_NUMBER}</th>
                                <td>{this.state.device.cpu_number}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_DMI_PRODUCT}</th>
                                <td>{this.state.device.dmi_product}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_HOSTID}</th>
                                <td>{this.state.device.hostid}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_HOSTNAME}</th>
                                <td>{this.state.device.hostname}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_KERNUN_VARIANT}</th>
                                <td>{this.state.device.kernun_variant}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_KERNUN_VERSION}</th>
                                <td>{this.state.device.kernun_version}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_VM_GUEST}</th>
                                <td>{this.state.device.vm_guest}</td>
                            </tr>
                            </tbody>
                        </table>
                    </TabPane>
                    <TabPane tab="Device status" key="4">
                        <table className="table-vertical">
                            <tbody>
                            <tr>
                                <th>{strings.FB_DETAIL_UPTIME}</th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.uptime}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_DISK_SPACE}</th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.disk_space}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_SYSTEM_TABLE}</th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.system_table}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_VM_STAT}</th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.vm_stat}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_CORE_DUMPS}</th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.core_dumps}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_RRD_PROXIES}</th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.rrd_proxies}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_N_PANICS}</th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.n_panics}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_N_ABORTS}</th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.n_aborts}</td>
                            </tr>
                            </tbody>
                        </table>
                    </TabPane>
                    <TabPane tab="Reporter" key="5">
                        <table className="table-vertical">
                            <tbody>
                            <tr>
                                <th>{strings.FB_DETAIL_REP_MIN_TIME}</th>
                                <td>{this.state.reporter && this.state.reporter.reporter_min_time != null && this.state.reporter.reporter_min_time !== '' ?
                                    moment(this.state.reporter.reporter_min_time).format('DD.MM.YYYY HH:mm:ss'):''}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_REP_MAX_TIME}</th>
                                <td>{this.state.reporter && this.state.reporter.reporter_max_time != null && this.state.reporter.reporter_max_time !== '' ?
                                    moment(this.state.reporter.reporter_max_time).format('DD.MM.YYYY HH:mm:ss'):''}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_REP_USERS}</th>
                                <td>{this.state.reporter && parseInt(this.state.reporter.reporter_users).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_REP_CLIENTS}</th>
                                <td>{this.state.reporter && parseInt(this.state.reporter.reporter_clients).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_CW_CATEGORIZED}</th>
                                <td>{this.state.reporter && parseInt(this.state.reporter.reporter_cw_categorized).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_CW_TOTAL}</th>
                                <td>{this.state.reporter && parseInt(this.state.reporter.reporter_cw_total).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_WEB_CATEGORIZED}</th>
                                <td>{this.state.reporter && parseInt(this.state.reporter.reporter_web_categorized).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th>{strings.FB_DETAIL_WEB_TOTAL}</th>
                                <td>{this.state.reporter && parseInt(this.state.reporter.reporter_web_total).toLocaleString()}</td>
                            </tr>
                            </tbody>
                        </table>
                    </TabPane>
                    <TabPane tab="KCW function" key="6">
                        <table className="table-vertical">
                            <tbody>
                            <tr>
                                <th>{strings.KCW_FUNC_DEPLOYMENT}</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_deployment}</td>
                            </tr>
                            <tr>
                                <th>{strings.KCW_FUNC_DHCP_CLIENT}</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_dhcp_client}</td>
                            </tr>
                            <tr>
                                <th>{strings.KCW_FUNC_NETIF_DEVICES}</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_netif_devices}</td>
                            </tr>
                            <tr>
                                <th>{strings.KCW_FUNC_TIME_ZONE}</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_time_zone}</td>
                            </tr>
                            <tr>
                                <th>{strings.KCW_FUNC_SSHD_ENABLED}</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_sshd_enabled}</td>
                            </tr>
                            <tr>
                                <th>{strings.KCW_FUNC_SSHD_KERNUN}</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_sshd_kernun}</td>
                            </tr>
                            <tr>
                                <th>{strings.KCW_FUNC_AUTO_UPDATE}</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_auto_update}</td>
                            </tr>
                            <tr>
                                <th>{strings.KCW_FUNC_LOG_ROTATION}</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_log_rotation}</td>
                            </tr>
                            <tr>
                                <th>{strings.KCW_FUNC_PROXY_LANG}</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_proxy_lang}</td>
                            </tr>
                            <tr>
                                <th>{strings.KCW_FUNC_HAND_OFF}</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_hand_off}</td>
                            </tr>
                            <tr>
                                <th>{strings.KCW_FUNC_DHCP_SERVER}</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_dhcp_server}</td>
                            </tr>
                            <tr>
                                <th>{strings.KCW_FUNC_HTTPS_INSP}</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_https_insp}</td>
                            </tr>
                            <tr>
                                <th>{strings.KCW_FUNC_AUTH}</th>
                                <td>{this.state.kcwFunction && this.state.kcwFunction.cw_auth}</td>
                            </tr>
                            <tr>
                                <th>{strings.KCW_FUNC_ANTIVIRUS}</th>
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

export default FeedbackDetail;
import React, { Component } from 'react';
import {message, Tabs, Tooltip} from "antd";
import moment from 'moment';
import {getFeedback} from "../../services/api";
import {strings} from "../../constants/strings";
import {Link} from "react-router-dom";

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
            .catch(e => {
                message.error(strings.ERROR)
            });
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
                <h1>{strings.HEADER_FB_DETAIL}</h1>
                <Tabs defaultActiveKey="1" size="small">
                    <TabPane tab="Basic info" key="1">
                        <table className="table-vertical">
                            <tbody>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_FA_ID}>
                                    {strings.FB_DETAIL_FA_ID}</Tooltip></th>
                                <td>{this.state.feedback.fa_id}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_DETERMINED_CUSTOMER}>
                                    {strings.FB_DETAIL_DETERMINED_CUSTOMER}</Tooltip></th>
                                <td><Link to={`/customers/detail/${this.state.feedback.determined_customer}`}>
                                        {this.state.feedback.determined_customer}
                                    </Link></td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_DOMAINS}>
                                    {strings.FB_DETAIL_DOMAINS}</Tooltip></th>
                                <td>{parseInt(this.state.feedback.domains).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_HOSTNAME}>
                                    {strings.FB_DETAIL_FB_HOSTNAME}</Tooltip></th>
                                <td>{this.state.feedback.feedback_hostname}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_FEEDBACK_IP}>
                                    {strings.FB_DETAIL_FB_IP}</Tooltip></th>
                                <td>{this.state.feedback.feedback_ip}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_FN}>
                                    {strings.FB_DETAIL_FN}</Tooltip></th>
                                <td>{this.state.feedback.fn}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_HITS}>
                                    {strings.FB_DETAIL_HITS}</Tooltip></th>
                                <td>{parseInt(this.state.feedback.hits).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_SIZE}>
                                    {strings.FB_DETAIL_SIZE}</Tooltip></th>
                                <td>{parseInt(this.state.feedback.size).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_PROCESSED}>
                                    {strings.FB_DETAIL_PROCESSED}</Tooltip></th>
                                <td>{moment(this.state.feedback.processed).format('DD.MM.YYYY HH:mm:ss')}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_UPLOAD_START}>
                                    {strings.FB_DETAIL_UPLOAD_START}</Tooltip></th>
                                <td>{this.state.feedback.upload_start != null && this.state.feedback.upload_start !== '' ?
                                    moment(this.state.feedback.upload_start).format('DD.MM.YYYY HH:mm:ss'):''}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_UPLOAD_FINISH}>
                                    {strings.FB_DETAIL_UPLOAD_FINISH}</Tooltip></th>
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
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_IDENT}>
                                    {strings.FB_DETAIL_IDENT}</Tooltip></th>
                                <td>{this.state.license.ident}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_CUSTOMER}>
                                    {strings.FB_DETAIL_CUSTOMER}</Tooltip></th>
                                <td>{this.state.license.customer}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_SERIAL}>
                                    {strings.FB_DETAIL_SERIAL}</Tooltip></th>
                                <td><Link to={`/licenses/detail/${this.state.license.serial}`}>
                                    {this.state.license.serial}</Link></td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_DEVCOUNT}>
                                    {strings.FB_DETAIL_DEVCOUNT}</Tooltip></th>
                                <td>{this.state.license.devcount}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_HW}>
                                    {strings.FB_DETAIL_HW}</Tooltip></th>
                                <td>{this.state.license.hw}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_EXPIRATION}>
                                    {strings.FB_DETAIL_EXPIRATION}</Tooltip></th>
                                <td>{expiration}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_UPGRADE}>
                                    {strings.FB_DETAIL_UPGRADE}</Tooltip></th>
                                <td>{upgrade}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_GROUP_TYPE}>
                                    {strings.FB_DETAIL_GROUP_TYPE}</Tooltip></th>
                                <td>{this.state.license.group_type}</td>
                            </tr>
                            </tbody>
                        </table>
                    </TabPane>
                    <TabPane tab="Device" key="3">
                        <table className="table-vertical">
                            <tbody>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_CPU_MODEL}>
                                    {strings.FB_DETAIL_CPU_MODEL}</Tooltip></th>
                                <td>{this.state.device.cpu_model}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_CPU_NUMBER}>
                                    {strings.FB_DETAIL_CPU_NUMBER}</Tooltip></th>
                                <td>{this.state.device.cpu_number}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_DMI_PRODUCT}>
                                    {strings.FB_DETAIL_DMI_PRODUCT}</Tooltip></th>
                                <td>{this.state.device.dmi_product}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_HOSTID}>
                                    {strings.FB_DETAIL_HOSTID}</Tooltip></th>
                                <td>{this.state.device.hostid}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_HOSTNAME}>
                                    {strings.FB_DETAIL_HOSTNAME}</Tooltip></th>
                                <td>{this.state.device.hostname}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_KERNUN_VARIANT}>
                                    {strings.FB_DETAIL_KERNUN_VARIANT}</Tooltip></th>
                                <td>{this.state.device.kernun_variant}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_KERNUN_VERSION}>
                                    {strings.FB_DETAIL_KERNUN_VERSION}</Tooltip></th>
                                <td>{this.state.device.kernun_version}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_VM_GUEST}>
                                    {strings.FB_DETAIL_VM_GUEST}</Tooltip></th>
                                <td>{this.state.device.vm_guest}</td>
                            </tr>
                            </tbody>
                        </table>
                    </TabPane>
                    <TabPane tab="Device status" key="4">
                        <table className="table-vertical">
                            <tbody>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_UPTIME}>
                                    {strings.FB_DETAIL_UPTIME}</Tooltip></th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.uptime}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_DISK_SPACE}>
                                    {strings.FB_DETAIL_DISK_SPACE}</Tooltip></th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.disk_space}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_SWAP_SPACE}>
                                    {strings.FB_DETAIL_SWAP_SPACE}</Tooltip></th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.swap_space}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_SYSTEM_TABLE}>
                                    {strings.FB_DETAIL_SYSTEM_TABLE}</Tooltip></th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.system_table}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_VM_STAT}>
                                    {strings.FB_DETAIL_VM_STAT}</Tooltip></th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.vm_stat}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_CORE_DUMPS}>
                                    {strings.FB_DETAIL_CORE_DUMPS}</Tooltip></th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.core_dumps}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_RRD_PROXIES}>
                                    {strings.FB_DETAIL_RRD_PROXIES}</Tooltip></th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.rrd_proxies}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_N_PANICS}>
                                    {strings.FB_DETAIL_N_PANICS}</Tooltip></th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.n_panics}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_N_ABORTS}>
                                    {strings.FB_DETAIL_N_ABORTS}</Tooltip></th>
                                <td>{this.state.deviceStatus && this.state.deviceStatus.n_aborts}</td>
                            </tr>
                            </tbody>
                        </table>
                    </TabPane>
                    <TabPane tab="Reporter" key="5">
                        {this.state.kcwFunction && <table className="table-vertical">
                            <tbody>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_REPORTER_MIN_TIME}>
                                    {strings.FB_DETAIL_REP_MIN_TIME}</Tooltip></th>
                                <td>{(this.state.reporter.reporter_min_time) ?
                                    moment(this.state.reporter.reporter_min_time).format('DD.MM.YYYY HH:mm:ss'):''}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_REPORTER_MAX_TIME}>
                                    {strings.FB_DETAIL_REP_MAX_TIME}</Tooltip></th>
                                <td>{this.state.reporter.reporter_max_time ?
                                    moment(this.state.reporter.reporter_max_time).format('DD.MM.YYYY HH:mm:ss'):''}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_REPORTER_USERS}>
                                    {strings.FB_DETAIL_REP_USERS}</Tooltip></th>
                                <td>{parseInt(this.state.reporter.reporter_users).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_REPORTER_CLIENTS}>
                                    {strings.FB_DETAIL_REP_CLIENTS}</Tooltip></th>
                                <td>{parseInt(this.state.reporter.reporter_clients).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_REPORTER_CW_CATEGORIZED}>
                                    {strings.FB_DETAIL_CW_CATEGORIZED}</Tooltip></th>
                                <td>{parseInt(this.state.reporter.reporter_cw_categorized).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_REPORTER_CW_TOTAL}>
                                    {strings.FB_DETAIL_CW_TOTAL}</Tooltip></th>
                                <td>{parseInt(this.state.reporter.reporter_cw_total).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_REPORTER_WEB_CATEGORIZED}>
                                    {strings.FB_DETAIL_WEB_CATEGORIZED}</Tooltip></th>
                                <td>{parseInt(this.state.reporter.reporter_web_categorized).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_REPORTER_WEB_TOTAL}>
                                    {strings.FB_DETAIL_WEB_TOTAL}</Tooltip></th>
                                <td>{parseInt(this.state.reporter.reporter_web_total).toLocaleString()}</td>
                            </tr>
                            </tbody>
                        </table>}
                    </TabPane>
                    <TabPane tab="KCW function" key="6">
                        {this.state.kcwFunction && <table className="table-vertical">
                            <tbody>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_CW_DEPLOYMENT}>
                                    {strings.KCW_FUNC_DEPLOYMENT}</Tooltip></th>
                                <td>{this.state.kcwFunction.cw_deployment}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_CW_DHCP_CLIENT}>
                                    {strings.KCW_FUNC_DHCP_CLIENT}</Tooltip></th>
                                <td>{this.state.kcwFunction.cw_dhcp_client}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_CW_NETIF_DEVICES}>
                                    {strings.KCW_FUNC_NETIF_DEVICES}</Tooltip></th>
                                <td>{this.state.kcwFunction.cw_netif_devices}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_CW_TIME_ZONE}>
                                    {strings.KCW_FUNC_TIME_ZONE}</Tooltip></th>
                                <td>{this.state.kcwFunction.cw_time_zone}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_CW_SSHD_ENABLED}>
                                    {strings.KCW_FUNC_SSHD_ENABLED}</Tooltip></th>
                                <td>{this.state.kcwFunction.cw_sshd_enabled}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_CW_SSHD_KERNUN}>
                                    {strings.KCW_FUNC_SSHD_KERNUN}</Tooltip></th>
                                <td>{this.state.kcwFunction.cw_sshd_kernun}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_CW_AUTO_UPDATE}>
                                    {strings.KCW_FUNC_AUTO_UPDATE}</Tooltip></th>
                                <td>{this.state.kcwFunction.cw_auto_update}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_CW_LOG_ROTATION}>
                                    {strings.KCW_FUNC_LOG_ROTATION}</Tooltip></th>
                                <td>{this.state.kcwFunction.cw_log_rotation}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_CW_PROXY_LANG}>
                                    {strings.KCW_FUNC_PROXY_LANG}</Tooltip></th>
                                <td>{this.state.kcwFunction.cw_proxy_lang}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_CW_HAND_OFF}>
                                    {strings.KCW_FUNC_HAND_OFF}</Tooltip></th>
                                <td>{this.state.kcwFunction.cw_hand_off}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_CW_DHCP_SERVER}>
                                    {strings.KCW_FUNC_DHCP_SERVER}</Tooltip></th>
                                <td>{this.state.kcwFunction.cw_dhcp_server}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_CW_HTTPS_INSP}>
                                    {strings.KCW_FUNC_HTTPS_INSP}</Tooltip></th>
                                <td>{this.state.kcwFunction.cw_https_insp}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_CW_AUTH}>
                                    {strings.KCW_FUNC_AUTH}</Tooltip></th>
                                <td>{this.state.kcwFunction.cw_auth}</td>
                            </tr>
                            <tr>
                                <th><Tooltip placement="right" title={strings.TOOLTIP_FB_CW_ANTIVIRUS}>
                                    {strings.KCW_FUNC_ANTIVIRUS}</Tooltip></th>
                                <td>{this.state.kcwFunction.cw_antivirus}</td>
                            </tr>
                            </tbody>
                        </table>}
                    </TabPane>

                </Tabs>
            </div>
        )
    }
}

export default FeedbackDetail;
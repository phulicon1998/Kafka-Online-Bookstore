import React, {Component} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
    NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
    NAV_STYLE_NO_HEADER_MINI_SIDEBAR
} from "../../constants/ThemeSetting";
import {connect} from "react-redux";
import * as credentials from "constants/credentialControl";
import {clearAuthData} from "appRedux/actions/user";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SidebarContent extends Component {

    getNoHeaderClass = (navStyle) => {
        if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
            return "gx-no-header-notifications";
        }
        return "";
    };
    getNavStyleSubMenuClass = (navStyle) => {
        if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
            return "gx-no-header-submenu-popup";
        }
        return "";
    };

    render() {
        const {navStyle, user, clearAuthData, role, location} = this.props;
        const selectedKeys = location.pathname;
        const defaultOpenKeys = selectedKeys.split('/')[1];
        return (
            <Auxiliary>
                <SidebarLogo/>
                <div className="gx-sidebar-content">
                    <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
                        <UserProfile
                            username={user.username}
                            avatar={user.avatar.link}
                            logout={clearAuthData}
                        />
                        <AppsNavigation/>
                    </div>
                    <CustomScrollbars className="gx-layout-sider-scrollbar">
                        <Menu
                            defaultOpenKeys={[defaultOpenKeys]}
                            selectedKeys={[selectedKeys]}
                            theme='dark'
                            mode="inline"
                        >
                            <MenuItemGroup
                                key="main"
                                className="gx-menu-group"
                                title="Main"
                            >
                                <SubMenu
                                    key="dashboard"
                                    className={this.getNavStyleSubMenuClass(navStyle)}
                                    title={ <span><i className="icon icon-dasbhoard"/>Dashboard</span> }
                                >
                                    <Menu.Item key="/app/dashboard">
                                        <Link to="/app/dashboard"><i className="icon icon-crypto"/>Dashboard</Link>
                                    </Menu.Item>
                                </SubMenu>
                                {role.isProvider || <SubMenu
                                    key="reports"
                                    className={this.getNavStyleSubMenuClass(navStyle)}
                                    title={
                                        <span><i className="icon icon-data-display"/>Manage Reports</span>
                                    }
                                >
                                    <Menu.Item key="/app/reports/book">
                                        <Link to="/app/reports/book"><i className="icon icon-crypto"/>For Books</Link>
                                    </Menu.Item>
                                    <Menu.Item key="/app/reports/category">
                                        <Link to="/app/reports/category"><i className="icon icon-crypto"/>For Categories</Link>
                                    </Menu.Item>
                                </SubMenu>}
                            </MenuItemGroup>

                            {(role.isSalestaff || role.isAdmin) && <MenuItemGroup
                                key="tools"
                                className="gx-menu-group"
                                title="Tools"
                            >
                                <Menu.Item key="/app/chat">
                                    <Link to="/app/chat"><i className="icon icon-chat"/> Chat Tool</Link>
                                </Menu.Item>
                            </MenuItemGroup>}

                            {role.isAdmin && <MenuItemGroup
                                key="system"
                                className="gx-menu-group"
                                title="System"
                            >
                                <Menu.Item key="/app/accounts">
                                    <Link to="/app/accounts"><i className="icon icon-auth-screen"/> Manage Accounts</Link>
                                </Menu.Item>
                            </MenuItemGroup>}

                            {(role.isSalestaff || role.isProvider || role.isAdmin) && <MenuItemGroup
                                key="counter"
                                className="gx-menu-group"
                                title="Counter"
                            >
                                { role.isProvider || <Menu.Item key="/app/providers">
                                    <Link to="/app/providers"><i className="icon icon-profile"/> Manage Provider</Link>
                                </Menu.Item>}
                                <Menu.Item key="/app/editions">
                                    <Link to="/app/editions"><i className="icon icon-files"/> Manage Edition</Link>
                                </Menu.Item>
                                {role.isProvider && <Menu.Item key="/app/editions/add">
                                    <Link to="/app/editions/add"><i className="icon icon-product-list"/> Add new edition</Link>
                                </Menu.Item>}
                            </MenuItemGroup>}

                            {(role.isSalestaff || role.isAdmin) && <MenuItemGroup
                                key="book"
                                className="gx-menu-group"
                                title="Book"
                            >
                                <Menu.Item key="/app/books">
                                    <Link to="/app/books"><i className="icon icon-pricing-table"/> Manage Books</Link>
                                </Menu.Item>
                                <Menu.Item key="/app/orders">
                                    <Link to="/app/orders"><i className="icon icon-shopping-cart"/> Manage Orders</Link>
                                </Menu.Item>
                                <Menu.Item key="/app/genres">
                                    <Link to="/app/genres"><i className="icon icon-tag"/> Manage Genres</Link>
                                </Menu.Item>
                                <Menu.Item key="/app/authors">
                                    <Link to="/app/authors"><i className="icon icon-user-o"/> Manage Authors</Link>
                                </Menu.Item>
                                <Menu.Item key="/app/publishers">
                                    <Link to="/app/publishers"><i className="icon icon-user"/> Manage Publishers</Link>
                                </Menu.Item>
                            </MenuItemGroup>}
                        </Menu>
                    </CustomScrollbars>
                </div>
            </Auxiliary>
        );
    }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({user, settings}) => {
    const {navStyle, themeType, locale, pathname} = settings;
    const {isPermit} = credentials;
    const {role} = user.data;
    return {
        navStyle, themeType, locale, pathname,
        user: user.data,
        role: {
            isSalestaff: isPermit(role)(credentials.SALESTAFF_PERMISSION),
            isManager: isPermit(role)(credentials.MANAGER_PERMISSION),
            isAdmin: isPermit(role)(credentials.ADMIN_PERMISSION),
            isProvider: isPermit(role)(credentials.PROVIDER_PERMISSION)
        }
    }
};
export default connect(mapStateToProps, {clearAuthData})(withRouter(SidebarContent));

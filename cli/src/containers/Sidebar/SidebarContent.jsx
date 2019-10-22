import React, {Component} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
    NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
    NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
    THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import {connect} from "react-redux";

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
        const {themeType, navStyle, pathname} = this.props;
        const selectedKeys = pathname.substr(1);
        const defaultOpenKeys = selectedKeys.split('/')[1];
        return (
            <Auxiliary>
                <SidebarLogo/>
                <div className="gx-sidebar-content">
                    <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
                        <UserProfile/>
                        <AppsNavigation/>
                    </div>
                    <CustomScrollbars className="gx-layout-sider-scrollbar">
                        <Menu
                            defaultOpenKeys={[defaultOpenKeys]}
                            selectedKeys={[selectedKeys]}
                            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
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
                                    title={
                                        <span><i className="icon icon-dasbhoard"/>Dashboard</span>
                                    }
                                >
                                    <Menu.Item key="main/dashboard/crypto">
                                        <Link to="/main/dashboard/crypto"><i className="icon icon-crypto"/>Dashboard</Link>
                                    </Menu.Item>
                                </SubMenu>
                                <Menu.Item key="app/genres">
                                    <Link to="/app/genres"><i className="icon icon-tag"/> Manage genres</Link>
                                </Menu.Item>
                                <Menu.Item key="app/authors">
                                    <Link to="/app/authors"><i className="icon icon-avatar"/> Manage authors</Link>
                                </Menu.Item>
                                <Menu.Item key="app/books">
                                    <Link to="/app/books"><i className="icon icon-product-list"/> Manage books</Link>
                                </Menu.Item>
                                <Menu.Item key="app/publishers">
                                    <Link to="/app/publishers"><i className="icon icon-product-list"/> Manage publishers</Link>
                                </Menu.Item>
                                <Menu.Item key="app/providers">
                                    <Link to="/app/providers"><i className="icon icon-product-list"/> Manage providers</Link>
                                </Menu.Item>
                                <Menu.Item key="app/editions">
                                    <Link to="/app/editions"><i className="icon icon-product-list"/> Manage editions</Link>
                                </Menu.Item>
                                <Menu.Item key="app/editions/add">
                                    <Link to="/app/editions/add"><i className="icon icon-product-list"/> Add new edition</Link>
                                </Menu.Item>
                            </MenuItemGroup>
                        </Menu>
                    </CustomScrollbars>
                </div>
            </Auxiliary>
        );
    }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({settings}) => {
    const {navStyle, themeType, locale, pathname} = settings;
    return {navStyle, themeType, locale, pathname}
};
export default connect(mapStateToProps)(SidebarContent);

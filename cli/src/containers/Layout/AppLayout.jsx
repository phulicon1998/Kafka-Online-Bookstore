import React, {Component} from "react";
import {Layout} from "antd";

import AppLocale from "lngProvider";
import {ConfigProvider} from "antd";
import {IntlProvider} from "react-intl";

import Sidebar from "../Sidebar/index";
import HorizontalDefault from "../Topbar/HorizontalDefault/index";
import HorizontalDark from "../Topbar/HorizontalDark/index";
import InsideHeader from "../Topbar/InsideHeader/index";
import AboveHeader from "../Topbar/AboveHeader/index";
import BelowHeader from "../Topbar/BelowHeader/index";

import Topbar from "../Topbar/index";
// import {footerText} from "util/config";
import AppRoutes from "views/App/index";
import Customizer from "containers/Customizer";
import {connect} from "react-redux";
import {
    NAV_STYLE_ABOVE_HEADER,
    NAV_STYLE_BELOW_HEADER,
    NAV_STYLE_DARK_HORIZONTAL,
    NAV_STYLE_DEFAULT_HORIZONTAL,
    NAV_STYLE_DRAWER,
    NAV_STYLE_FIXED,
    NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
    NAV_STYLE_MINI_SIDEBAR,
    NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
    NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
    TAB_SIZE,
    LAYOUT_TYPE_BOXED,
    LAYOUT_TYPE_FRAMED,
    LAYOUT_TYPE_FULL
} from "constants/ThemeSetting";
import NoHeaderNotification from "../Topbar/NoHeaderNotification/index";
import {
    onLayoutTypeChange,
    onNavStyleChange,
    setThemeType
} from "appRedux/actions/setting";

const {Content, Footer} = Layout;

export class AppLayout extends Component {

    getContainerClass = (navStyle) => {
        switch (navStyle) {
            case NAV_STYLE_DARK_HORIZONTAL:
            return "gx-container-wrap";
            case NAV_STYLE_DEFAULT_HORIZONTAL:
            return "gx-container-wrap";
            case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
            return "gx-container-wrap";
            case NAV_STYLE_BELOW_HEADER:
            return "gx-container-wrap";
            case NAV_STYLE_ABOVE_HEADER:
            return "gx-container-wrap";
            default:
            return '';
        }
    };

    getNavStyles = (navStyle) => {
        switch (navStyle) {
            case NAV_STYLE_DEFAULT_HORIZONTAL :
            return <HorizontalDefault/>;
            case NAV_STYLE_DARK_HORIZONTAL :
            return <HorizontalDark/>;
            case NAV_STYLE_INSIDE_HEADER_HORIZONTAL :
            return <InsideHeader/>;
            case NAV_STYLE_ABOVE_HEADER :
            return <AboveHeader/>;
            case NAV_STYLE_BELOW_HEADER :
            return <BelowHeader/>;
            case NAV_STYLE_FIXED :
            return <Topbar/>;
            case NAV_STYLE_DRAWER :
            return <Topbar/>;
            case NAV_STYLE_MINI_SIDEBAR :
            return <Topbar/>;
            case NAV_STYLE_NO_HEADER_MINI_SIDEBAR :
            return <NoHeaderNotification/>;
            case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR :
            return <NoHeaderNotification/>;
            default :
            return null;
        }
    };

    getSidebar = (navStyle, width) => {
        if (width < TAB_SIZE) {
            return <Sidebar/>;
        }
        switch (navStyle) {
            case NAV_STYLE_FIXED :
            return <Sidebar/>;
            case NAV_STYLE_DRAWER :
            return <Sidebar/>;
            case NAV_STYLE_MINI_SIDEBAR :
            return <Sidebar/>;
            case NAV_STYLE_NO_HEADER_MINI_SIDEBAR :
            return <Sidebar/>;
            case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
            return <Sidebar/>;
            default :
            return null;
        }
    };

    setLayoutType = (layoutType) => {
        if (layoutType === LAYOUT_TYPE_FULL) {
            document.body.classList.remove('boxed-layout');
            document.body.classList.remove('framed-layout');
            document.body.classList.add('full-layout');
        } else if (layoutType === LAYOUT_TYPE_BOXED) {
            document.body.classList.remove('full-layout');
            document.body.classList.remove('framed-layout');
            document.body.classList.add('boxed-layout');
        } else if (layoutType === LAYOUT_TYPE_FRAMED) {
            document.body.classList.remove('boxed-layout');
            document.body.classList.remove('full-layout');
            document.body.classList.add('framed-layout');
        }
    };

    setNavStyle = (navStyle) => {
        if (navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
            navStyle === NAV_STYLE_DARK_HORIZONTAL ||
            navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
            navStyle === NAV_STYLE_ABOVE_HEADER ||
            navStyle === NAV_STYLE_BELOW_HEADER) {
            document.body.classList.add('full-scroll');
            document.body.classList.add('horizontal-layout');
        } else {
            document.body.classList.remove('full-scroll');
            document.body.classList.remove('horizontal-layout');
        }
    };

    render() {
        const {match, width, navStyle, layoutType, locale} = this.props;
        this.setLayoutType(layoutType);
        this.setNavStyle(navStyle);
        const currentAppLocale = AppLocale[locale.locale];
        return (
            <ConfigProvider locale={currentAppLocale.antd}>
                <IntlProvider
                    locale={currentAppLocale.locale}
                    messages={currentAppLocale.messages}
                >
                    <Layout className="gx-app-layout">
                        {this.getSidebar(navStyle, width)}
                        <Layout>
                            {this.getNavStyles(navStyle)}
                            <Content className={`gx-layout-content ${ this.getContainerClass(navStyle)} `}>
                                <AppRoutes match={match}/>
                                <Footer>
                                    <div className="gx-layout-footer-content">Copyright Company Name © 2019</div>
                                </Footer>
                            </Content>
                        </Layout>
                        <Customizer/>
                    </Layout>
                </IntlProvider>
            </ConfigProvider>
        )
    }
}

const mapStateToProps = ({settings}) => {
    const {locale, layoutType, width, navStyle} = settings;
    return {width, navStyle, locale, layoutType}
};

export default connect(mapStateToProps, {
    setThemeType,
    onNavStyleChange,
    onLayoutTypeChange
})(AppLayout);

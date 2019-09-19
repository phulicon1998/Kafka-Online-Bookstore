import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import Landing from "./Landing";
import {connect} from "react-redux";
import AppLayout from "containers/Layout/AppLayout";
import AppLocale from "lngProvider";
// import URLSearchParams from 'url-search-params'
import {LocaleProvider} from "antd";
import {IntlProvider} from "react-intl";

import {onLayoutTypeChange, onNavStyleChange, setThemeType} from "appRedux/actions/setting";

import {
    LAYOUT_TYPE_BOXED,
    LAYOUT_TYPE_FRAMED,
    LAYOUT_TYPE_FULL,
    NAV_STYLE_ABOVE_HEADER,
    NAV_STYLE_BELOW_HEADER,
    NAV_STYLE_DARK_HORIZONTAL,
    NAV_STYLE_DEFAULT_HORIZONTAL,
    NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from "constants/ThemeSetting";

class RootRoutes extends Component {

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

    // componentDidMount() {
    //     if (this.props.initURL === '') {
    //         this.props.setInitUrl(this.props.history.location.pathname);
    //     }
    //     const params = new URLSearchParams(this.props.location.search);
    //
    //     if (params.has("theme")) {
    //         this.props.setThemeType(params.get('theme'));
    //     }
    //     if (params.has("nav-style")) {
    //         this.props.onNavStyleChange(params.get('nav-style'));
    //     }
    //     if (params.has("layout-type")) {
    //         this.props.onLayoutTypeChange(params.get('layout-type'));
    //     }
    // }

    render() {
        const {layoutType, navStyle, locale} = this.props;
        this.setLayoutType(layoutType);
        this.setNavStyle(navStyle);
        const currentAppLocale = AppLocale[locale.locale];
        return (
            <LocaleProvider locale={currentAppLocale.antd}>
                <IntlProvider
                    locale={currentAppLocale.locale}
                    messages={currentAppLocale.messages}
                >
                    <Switch>
                        <Route path="/app" component={AppLayout}/>
                        <Route exact path="/" component={Landing}/>
                    </Switch>
                </IntlProvider>
            </LocaleProvider>
        )
    }
}

const mapStateToProps = ({settings}) => {
    const {locale, navStyle, layoutType} = settings;
    return {locale, navStyle, layoutType}
};

export default connect(mapStateToProps, {setThemeType, onNavStyleChange, onLayoutTypeChange})(RootRoutes);

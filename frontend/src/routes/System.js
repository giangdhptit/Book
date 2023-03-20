import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import BookManage from '../containers/System/BookManage';
import HomePage from '../containers/System/HomePage';
import Cart from '../containers/System/Cart';
import Order from '../containers/System/Order';
import ProductManage from '../containers/System/ProductManage';
import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        const json = JSON.parse(localStorage.getItem("user"));
        const role = json.role;
        console.log(role);
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/system/book-manage" component={role=="admin"? BookManage:null} />
                        <Route path="/system/home-page" component={HomePage} />
                        <Route path="/system/cart" component={Cart} />
                        <Route path="/system/order" component={Order} />
                        <Route path="/system/product-manage" component={ProductManage} />
                        <Route path="/system/register-package-group-or-account" component={RegisterPackageGroupOrAcc} />
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);

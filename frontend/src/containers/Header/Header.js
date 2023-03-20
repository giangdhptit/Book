import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';

class Header extends Component {

    render() {
        const { processLogout } = this.props;
        const { processCart } = this.props;

        return (
            <div className="header-container">
                      
                        {/* nút logout */}
                   <div>
                        <div className="btn btn-logout" onClick={processLogout}>
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                    </div>
                    <div>
                            
                            <div className="btn btn-cart" onClick={()=>{window.location.href="http://localhost:3000/system/book-manage"}}>
                                <i class="fas fa-user-friends"></i>
                            </div>
                    </div>
                    <div>
                            
                            <div className="btn btn-cart" onClick={()=>{window.location.href="http://localhost:3000/system/home-page"}}>
                            <i class="fas fa-home"></i>
                            </div>
                    </div>
                    <div>
                            {/* thanh navigator */}
                            <div className="btn btn-cart" onClick={()=>{window.location.href="http://localhost:3000/system/cart"}}>
                                <i className="fas fa-shopping-cart"></i>
                            </div>
                    </div>
                    <div>
                            
                            <div className="btn btn-cart" onClick={()=>{window.location.href="http://localhost:3000/system/order"}}>
                            <i class="fas fa-bell"></i>
                            </div>
                    </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        processCart: () => dispatch(actions.processCart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

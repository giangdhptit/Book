import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { transpileModule } from 'typescript';
import _ from 'lodash';
 import img_ from '../../assets/images/bruce-mars.jpg';
class BuyDetails extends Component {
    

    constructor(props){
        super(props);
        this.state = {
            phone:'',
            address:''
        }
        
    }


    state = {

    }

    componentDidMount() {

    }

    toggle = ()=>{
        this.props.toggleFromParent();
       
    }
    handleOnChangeInputPhone = (event) => {
        this.setState({
            phone: event.target.value,
        })
        
    }
    handleOnChangeInputAddress = (event) => {
        this.setState({
            address: event.target.value,
        })
        
    }
    checkValidInput = () => {
        let isValid = true;
        if ((!this.state.address)|| (!this.state.phone)){
            isValid = false;
            alert('Please fill in all fields !')
        }
        return isValid;
    }
    handlePlaceOrder = () =>{

        // this.setState({
        //     errMessage:''
        // })
        let isValid =this.checkValidInput();
        if (isValid===true){
            this.props.shippingDetails(this.state);

            this.toggle();
            alert("Order Completed !")
        }
    }
    
    render() {
        
        return (
            <Modal 

                isOpen={this.props.isOpen} 
                toggle={()=>{this.toggle()}} 
                className={'modalClassName'}
                size="lg"
                centered
            >
                <ModalHeader toggle={()=>{this.toggle()}}>Shipping Details</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className='row1' >
                            
                                <br />
                                
                                <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Phone</span>
                                </div>
                                    <input 
                                        type="text" 
                                        value = {this.state.phone}
                                        onChange={(event)=>this.handleOnChangeInputPhone(event)}
                                        class="form-control"
                                    />
                                </div>

                                <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Address</span>
                                </div>
                                    <input 
                                        type="text" 
                                        value = {this.state.address}
                                        onChange={(event)=>this.handleOnChangeInputAddress(event)}
                                        class="form-control"
                                    />
                                </div>

                                
                               
                        </div>

                        
                         
                    </div>
                    
                </ModalBody>
                <ModalFooter>
                    
                    <button id="buttonSave" color="primary" onClick={()=>{
                        this.handlePlaceOrder()
                        }} >
                        PlaceOrder
                    </button>{' '}
                    <button color="secondary" onClick={()=>{this.toggle()}}>
                        Cancel
                    </button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyDetails);



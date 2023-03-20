import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { transpileModule } from 'typescript';
import _ from 'lodash';
 import img_ from '../../assets/images/bruce-mars.jpg';
class ModalOrder extends Component {
    

    constructor(props){
        super(props);
        this.state = {
            phone:'',
            address:'',
            arrBills:[]
        }
        
    }



    state = {

    }

    componentDidMount() {
        this.getAllBills_fromCode(this.props.bill_code);
        
    }
    getBook =(book_id) =>{
        
        
    }
    getAllBills_fromCode=(bill_code)=>  {
        let arrBill_book,arrBills =[];
        const res =  fetch("http://localhost:8080/Bills",{
            method : "GET",
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },


        }).then((response) => response.json())
        .then((responseJson) => {

            console.log(responseJson);
            if (responseJson){
                //console.log('111111')
                arrBill_book = responseJson
            }

            for (let i=0;i<arrBill_book.length;i++){
                if(arrBill_book[i].code===bill_code){
                    try{
                        let res = fetch("http://localhost:8080/Books/"+arrBill_book[i].book_id,{
                            method : "GET",
                                headers : {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }
                            }).then((response) => response.json())
                                .then((responseJson) => {
            
                                    console.log(responseJson);

                                        let book_title= responseJson.data['title'];
                                        arrBills.push(
                                            {
                                                title : book_title,
                                                quantity : arrBill_book[i].quantity,
                                                address : arrBill_book[i].address,
                                                phone : arrBill_book[i].phone
                                            }
                                        );
                                        this.setState({
                                            arrBills : arrBills,
                                            address : arrBill_book[0].address,
                                            phone : arrBills[0].phone
                                        }) 
                                    
            
                                });
                        //console.log('click save',book)
                    }catch(e){
                        console.log(e)
                    }
                    
                }
                
            }
           
            console.log('sach trong bill',arrBills);
             

            });
            //console.log('code bill',bill_code);
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

    
    render() {
        var arrBills=this.state.arrBills;
        return (
            <Modal 

                isOpen={this.props.isOpen} 
                toggle={()=>{this.toggle()}} 
                className={'modalClassName'}
                size="lg"
                centered
            >
                <ModalHeader toggle={()=>{this.toggle()}}>Order Details</ModalHeader>
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
                            <table class="table table-bordered table-striped table-responsive-stack"  id="tableOne">
                                <thead class="thead-dark">
                        
                                        <tr>
                                            <th>
                                        

                                                <div className="col col-1-1">Book</div>
                                            
                                            </th>
                                            <th>
                                                
                                                    <div className="col col-2-1">Quantity</div>
                                                
                                                
                                            </th>
                                        </tr>
                                
                                </thead>
                                <tbody>    
                                            {
                                                arrBills && arrBills.map((Bill)=>{
                                                    
                                                    return(
                                                        <tr>

                                                            <th>{Bill.title}</th>
                                                            <th>{Bill.quantity}</th>
                        

                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>   
                            
                            </table>         
                    </div>
                </div>
                    
                </ModalBody>
                <ModalFooter>

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

export default connect(mapStateToProps, mapDispatchToProps)(ModalOrder);



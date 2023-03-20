import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';  
import './Order.scss';
import {getAllBooks} from '../../services/bookService';
import { indexOf } from 'lodash';
//import styled from 'styled-components';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import { Button, ButtonInverted } from '../button';
import BuyDetails from './BuyDetails';
import ModalOrder from './ModalOrder';
import ScrollView from 'react'

//import 'react-confirm-alert/src/react-confirm-alert.css';
class Order extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            arrBooks:[],
            arrBill_book:[],
            isOpenModalOrder:false,
            bill_code:{},
            //isOpenBuyDetails:false,
            isOpenModalDeleteBook:false,
            bookDelete:{},
            bookEdit:{}
        }

    }

     componentDidMount() {
        // let response = await getAllBooks();
        // console.log('Book',response)
         this.getAllBills();
        
     }
    getAllBills=()=>  {
        const json = JSON.parse(localStorage.getItem("user"));
        const uid = json.id;
        let arrBill_book,arrBills =[];
        const res =  fetch("http://localhost:8080/Bills/"+uid,{
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
                console.log('res',responseJson)
                this.setState({
                    arrBill_book : responseJson
                })
            }

            let arrAllBills = arrBill_book;
            arrBills.push(arrBill_book[0])
            console.log('trong getall',arrBill_book);
            for (let i=1;i<arrBill_book.length;i++){
                let tt=true;
                for (let j=0;j<arrBills.length;j++){
                    if(arrBills[j].code===arrBill_book[i].code){
                        tt=false;
                    }
                }
                if (tt==true){
                    arrBills.push(arrBill_book[i]);
                }
            }
            
            this.setState({
                arrBills : arrBills,
                arrBill_book : arrBill_book
            })
        });
       
    }
    handleDelete =  (Bill) =>{

        //confirm("Press a button!")
        if (window.confirm("Are you sure ?")) {
                this.doDelete(Bill);
          }
    }
    handleView =  (Bill) =>{
        let arrBill_book=this.state.arrBill_book;
        console.log('mangg',arrBill_book);
        this.setState({
            isOpenModalOrder:true,
            bill_code:Bill.code,

        })
        //console.log('check view',Book)
   }

    doDelete = async (bill) =>{
        let arrBill_book=this.state.arrBill_book;
        //console.log('mangg',arrBill_book);
        for (let i=0;i<arrBill_book.length;i++){
            if (arrBill_book[i].code===bill.code){
                try{
                    let res = await fetch("http://localhost:8080/Bills/"+arrBill_book[i].id+"/delete",{
                        method : "DELETE",
                            headers : {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        }).then((response) => response.json())
                            .then((responseJson) => {
        
                                console.log(responseJson);
                                if (responseJson.status=='ok'){
                                    this.setState({
                                        isOpenModalBook:false
                                    })
                                     this.getAllBills()
                                }
                                return responseJson.user;
                            });
                    //console.log('click save',book)
                    console.log('xoa')
                }catch(e){
                    console.log(e)
                }
            }
        }
        
    }

    
    
    toggleModalOrder = () => {
        this.setState({
            isOpenModalOrder : !this.state.isOpenModalOrder,
        })
    }

    toggleDeleteBookModal = () => {
        this.setState({
            isOpenModalDeleteBook : !this.state.isOpenModalDeleteBook,
        })
    }
    
    render() {
        //console.log('render',this.state);
        let arrOrderItem=[];
        let arrOrderQuantity=[];
        const arrBills = this.state.arrBills;
        

        
        return (
           
            <div className="book-container">
                
                {
                    this.state.isOpenBuyDetails &&
                
                    <BuyDetails 
                        isOpen = {this.state.isOpenBuyDetails}
                        toggleFromParent={this.toggleBuyDetails}
                        shippingDetails={this.doBuy}
                    />
                }
                {
                    this.state.isOpenModalOrder &&
                
                    <ModalOrder
                        isOpen = {this.state.isOpenModalOrder}
                        toggleFromParent={this.toggleModalOrder}
                        bill_code={this.state.bill_code}
                        editBook={this.doEditBook}
                    />
                }
                
                {/* <ModalAddBook 
                    isOpen = {this.state.isOpenOrderItemDetails}
                    toggleFromParent={this.toggleBookModal}
                    createNewBid={this.createNewBid}
                    BookModal = {this.state.Book}
                /> */}
                <ul className="responsive-table">
                    <b>
                    <li className="table-header">
                        <div className="col col-1-1">Order No.</div>
                        <div className="col col-2-1">Phone</div>
                        <div className="col col-3-1">Address</div>
                        <div className="col col-4-1">Quantity</div>
                        <div className="col col-5-1">Action</div>
                    </li>
                    </b>
                        {
                            

                            arrBills && arrBills.map((Bill)=>{
                                
                                return(
                                    <li className="table-row">
                                        <div className="col col-1-1" data-label="Job Id">{Bill.code}</div>
                                        <div className="col col-2-1" data-label="Customer Name">{Bill.phone}</div>
                                        <div className="col col-3-1" data-label="Amount">{Bill.address}</div>
                                        <div className="col col-4-1" data-label="Amount">{Bill.quantity}</div>
    
                                        <div className="col col-5-1" data-label="Payment Status">
                                            {/* <button>
                                                EDIT
                                            </button>
                                            <button>DELETE</button> */}
                                            <button onClick={()=>{this.handleView(Bill)}}>View</button>
                                            <button onClick={()=>{this.handleDelete(Bill)}}>Cancel Order</button>
                                        </div>

                                    </li>
                                )
                              
                            })
                        }
     
                </ul>
            </div>
           
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Order);

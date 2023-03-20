import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';  
import './Cart.scss';
import {getAllBooks} from '../../services/bookService';
import { indexOf } from 'lodash';
//import styled from 'styled-components';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import { Button, ButtonInverted } from '../button';
import BuyDetails from './BuyDetails';
import CartItemDetails from './CartItemDetails';
import ScrollView from 'react'

//import 'react-confirm-alert/src/react-confirm-alert.css';
class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            arrBooks:[],
            isOpenCartItemDetails:false,
            isOpenBuyDetails:false,
            isOpenModalDeleteBook:false,
            bookDelete:{},
            bookEdit:{}
        }

    }

     componentDidMount() {
        // let response = await getAllBooks();
        // console.log('Book',response)
         this.getAllBooks();
        
     }
    getAllBooks=()=>  {
        const res =  fetch("http://localhost:8080/Books",{
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
                this.setState({
                    arrBooks : responseJson
                })
            }

            });


    }
    handleDelete =  (Book) =>{

        //confirm("Press a button!")
        if (window.confirm("Are you sure ?")) {
                this.doDelete(Book);
          }
    }
    handleView =  (Book) =>{

        this.setState({
            isOpenCartItemDetails:true,
            bookEdit:Book,

        })
        console.log('check view',Book)
   }

    doDelete = async (book) =>{
        
        try{
            sessionStorage.removeItem(book.id);
            this.componentDidMount()
        }catch(e){
            console.log(e)
        }
    }
    handleBuyDetails = ()=>{
        this.setState({
            isOpenBuyDetails:true,
    })}
    doBuy = async(sD)=>{
        let arrCartItem=[];
        let arrCartQuantity=[];
        const arrBooks = this.state.arrBooks;
        console.log("mang book", arrBooks)
        for (let i=0; i<arrBooks.length;i++){

            let item=sessionStorage.getItem(arrBooks[i].id);
           
            if (item) {
                arrCartItem.push(arrBooks[i]);
                arrCartQuantity.push(parseInt(item))
            }
        }
        let arrCart=[];
        for (let i=0; i<arrCartItem.length;i++){
            arrCart.push({
                id:arrCartItem[i].id,
                title:arrCartItem[i].title,
                author:arrCartItem[i].author,
                quantity:arrCartQuantity[i],
            })
        }


        let code = (Math.floor(Math.random() * 1000)).toString();
        let uid= localStorage.getItem("user");
        let json=JSON.parse(uid)
        for (let i=0; i<arrCart.length;i++){

            const formData = new FormData();
                formData.append("user_id",json.id);
                formData.append("book_id",arrCart[i].id);
                formData.append("quantity",arrCart[i].quantity);
                formData.append("code",code);
                formData.append("address",sD.address);
                formData.append("phone",sD.phone);
            console.log('fdt',formData)
            let json_body = JSON.stringify({
                user_id : json.id,
                book_id : arrCart[i].id,
                quantity : arrCart[i].quantity,
                code : code,
                address : sD.address,
                phone : sD.phone
            })
            console.log('body',json_body)
            try{
                let res = await fetch("http://localhost:8080/Bills/add",{
                        method : "POST",
                        headers : {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body : json_body
    
                        }).then((response) => response.json())
                            .then((responseJson) => {
    
                                console.log('res post:',responseJson);
                                if (responseJson.status=='ok'){
                                    this.setState({
                                        isOpenCartItemDetails:false
                                    })
                                    this.getAllBooks()
                                }
                                return responseJson.user;
                            });
                    //console.log('click save',book)
                }catch(e){
                    console.log(e)
                };
        }

        
    }
    doEditBook = async (book) => {
        const formData = new FormData();
                formData.append("title",book.title);
                formData.append("author",book.author);
                formData.append("publishing_day",book.publishing_day);
                formData.append("pages",book.pages);
                formData.append("type",book.type);
                formData.append("description",book.description);
                formData.append("photo",book.photo);
            console.log('photo',book.photo)
        if (book.id==0){
            try{
                
                let res = await fetch("http://localhost:8080/Books/add",{
                    method : "POST",
                    headers : {
                        'Accept': 'application/json',
                        // 'Content-Type': 'multipart/form-data'
                    },
                    body : formData

                    }).then((response) => response.json())
                        .then((responseJson) => {

                            console.log('res post:',responseJson);
                            if (responseJson.status=='ok'){
                                this.setState({
                                    isOpenCartItemDetails:false
                                })
                                this.getAllBooks()
                            }
                            return responseJson.user;
                        });
                console.log('click save',book)
            }catch(e){
                console.log(e)
            }
        }else{
            try{
                let res = await fetch("http://localhost:8080/Books/"+book.id+"/update",{
                    method : "PUT",
                        headers : {
                            'Accept': 'application/json',

                        },
                        body : formData

                    }).then((response) => response.json())
                        .then((responseJson) => {

                            console.log('res :',responseJson);
                            if (responseJson.status=='ok'){
                                this.setState({
                                    isOpenCartItemDetails:false
                                })
                                this.getAllBooks()
                            }
                            return responseJson.user;
                        });
                console.log('click save',book)
            }catch(e){
                console.log(e)
            }
        }
    }
    toggleBookModal = () => {
        this.setState({
            isOpenCartItemDetails : !this.state.isOpenCartItemDetails,
        })
    }
    toggleBuyDetails = () => {
        this.setState({
            isOpenBuyDetails : !this.state.isOpenBuyDetails,
        })
    }
    toggleDeleteBookModal = () => {
        this.setState({
            isOpenModalDeleteBook : !this.state.isOpenModalDeleteBook,
        })
    }
    
    render() {
        //console.log('render',this.state);
        let arrCartItem=[];
        let arrCartQuantity=[];
        const arrBooks = this.state.arrBooks;
        console.log("mang book", arrBooks)
        for (let i=0; i<arrBooks.length;i++){

            let item=sessionStorage.getItem(arrBooks[i].id);
           
            if (item) {
                arrCartItem.push(arrBooks[i]);
                arrCartQuantity.push(parseInt(item))
            }
        }
        let arrCart=[];
        for (let i=0; i<arrCartItem.length;i++){
            arrCart.push({
                id:arrCartItem[i].id,
                title:arrCartItem[i].title,
                author:arrCartItem[i].author,
                quantity:arrCartQuantity[i],
            })
        }

        console.log('arrCart',arrCart)
        return (
           
            <div className="book-container">
                <button onClick={()=>{this.handleBuyDetails(arrCart)}}>Buy</button>
                {
                    this.state.isOpenBuyDetails &&
                
                    <BuyDetails 
                        isOpen = {this.state.isOpenBuyDetails}
                        toggleFromParent={this.toggleBuyDetails}
                        shippingDetails={this.doBuy}
                    />
                }
                {
                    this.state.isOpenCartItemDetails &&
                
                    <CartItemDetails 
                        isOpen = {this.state.isOpenCartItemDetails}
                        toggleFromParent={this.toggleBookModal}
                        currentBook={this.state.bookEdit}
                        editBook={this.doEditBook}
                    />
                }
                
                {/* <ModalAddBook 
                    isOpen = {this.state.isOpenCartItemDetails}
                    toggleFromParent={this.toggleBookModal}
                    createNewBid={this.createNewBid}
                    BookModal = {this.state.Book}
                /> */}
                <ul className="responsive-table">
                    <b>
                    <li className="table-header">
                        <div className="col col-1-1">No</div>
                        <div className="col col-2-1">Title</div>
                        <div className="col col-3-1">Author</div>
                        <div className="col col-4-1">Quantity</div>
                        <div className="col col-5-1">Action</div>
                    </li>
                    </b>
                        {
                            

                            arrCart && arrCart.map((Book)=>{
                                
                                return(
                                    <li className="table-row">
                                        <div className="col col-1-1" data-label="Job Id">{Book.id}</div>
                                        <div className="col col-2-1" data-label="Customer Name">{Book.title}</div>
                                        <div className="col col-3-1" data-label="Amount">{Book.author}</div>
                                        <div className="col col-4-1" data-label="Amount">{Book.quantity}</div>
    
                                        <div className="col col-5-1" data-label="Payment Status">
                                            {/* <button>
                                                EDIT
                                            </button>
                                            <button>DELETE</button> */}
                                            <button onClick={()=>{this.handleView(Book)}}>View</button>
                                            <button onClick={()=>{this.handleDelete(Book)}}>Delete</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

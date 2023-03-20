import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';  
import './BookManage.scss';
import {getAllBooks} from '../../services/bookService';
import { indexOf } from 'lodash';
//import styled from 'styled-components';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import { Button, ButtonInverted } from '../button';
import ModalBook from './ModalBook';
import ScrollView from 'react'

//import 'react-confirm-alert/src/react-confirm-alert.css';
class BookManage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            arrBooks:[],
            isOpenModalBook:false,
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
            isOpenModalBook:true,
            bookEdit:Book,
            
        })
        console.log('check view',Book)
   }
   handleAdd =()=>{
    this.setState({
        isOpenModalBook:true,

    })
   }
    doDelete = async (book) =>{
        
        try{
            let res = await fetch("http://localhost:8080/Books/"+book.id+"/delete",{
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
                             this.getAllBooks()
                        }
                        return responseJson.user;
                    });
            console.log('click save',book)
        }catch(e){
            console.log(e)
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
                                    isOpenModalBook:false
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
                                    isOpenModalBook:false
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
            isOpenModalBook : !this.state.isOpenModalBook,
        })
    }
    toggleDeleteBookModal = () => {
        this.setState({
            isOpenModalDeleteBook : !this.state.isOpenModalDeleteBook,
        })
    }
    
    render() {
        //console.log('render',this.state);
        const arrBooks = this.state.arrBooks;

        return (
           
            <div className="book-container">
                <button onClick={()=>{this.handleAdd()}}>Add new</button>
                {
                    this.state.isOpenModalBook &&
                
                    <ModalBook 
                        isOpen = {this.state.isOpenModalBook}
                        toggleFromParent={this.toggleBookModal}
                        currentBook={this.state.bookEdit}
                        editBook={this.doEditBook}
                    />
                }
                
                {/* <ModalAddBook 
                    isOpen = {this.state.isOpenModalBook}
                    toggleFromParent={this.toggleBookModal}
                    createNewBid={this.createNewBid}
                    BookModal = {this.state.Book}
                /> */}
                <ul className="responsive-table">
                    <b>
                    <li className="table-header">
                        <div className="col col-1">No</div>
                        <div className="col col-2">Title</div>
                        <div className="col col-3">Author</div>
                        <div className="col col-4">Published in</div>
                        <div className="col col-5">Pages</div>
                        <div className="col col-6">Type</div>
                        <div className="col col-7">Description</div>
                        <div className="col col-8">Action</div>
                    </li>
                    </b>
                        {
                            

                            arrBooks && arrBooks.map((Book)=>{
                                
                                return(
                                    <li className="table-row">
                                        <div className="col col-1" data-label="Job Id">{Book.id}</div>
                                        <div className="col col-2" data-label="Customer Name">{Book.title}</div>
                                        <div className="col col-3" data-label="Amount">{Book.author}</div>
                                        <div className="col col-4" data-label="Payment Status">{Book.publishing_day}</div>
                                        <div className="col col-5" data-label="Payment Status">{Book.pages}</div>
                                        <div className="col col-6" data-label="Payment Status">{Book.type}</div>
                                        <div className="col col-7" data-label="Payment Status">{Book.description}</div>
                                        

                                        <div className="col col-8" data-label="Payment Status">
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

export default connect(mapStateToProps, mapDispatchToProps)(BookManage);

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';  
import './HomePage.scss';
import {getAllBooks} from '../../services/bookService';
import { indexOf, isInteger } from 'lodash';
//import styled from 'styled-components';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import { Button, ButtonInverted } from '../button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import BookDetails from './BookDetails';

import Container from 'react-bootstrap/Container';



//import 'react-confirm-alert/src/react-confirm-alert.css';
class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            arrBooks:[],
            isOpenBookDetails:false,
            isOpenBuy:false,
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
    
    handleView =  (book) =>{
        this.setState({
            isOpenBookDetails:true,
            bookEdit:book,
            
        })
        console.log('check view',book)
   }
   handleAdd =()=>{
    this.setState({
        isOpenBookDetails:true,

    })
   }
    
    toggleBookDetails = () => {
        this.setState({
            isOpenBookDetails : !this.state.isOpenBookDetails,
        })
    }

    
    render() {
        const arrBooks = this.state.arrBooks;
        let col = 3;
        let row = parseInt(arrBooks.length/3 + 1);
        console.log(row)
        return(
            <Container>
                {this.state.isOpenBookDetails &&
                
                <BookDetails 
                    isOpen = {this.state.isOpenBookDetails}
                    toggleFromParent={this.toggleBookDetails}
                    currentBook={this.state.bookEdit}
                    editBook={this.doEditBook}
                />}
            {arrBooks && arrBooks.map((book)=>{
                return (   
                    <Row className='row'>
                        <Col>
                            <Card >
                                <Card.Img className={"card-img"} variant="bottom" src={"http://localhost:8080/Books/"+book.id+"/" + book.photo_name}/>
                                <Card.Body>
                                    <Card.Title><strong>{book.title}</strong></Card.Title>
                                    <Card.Text>
                                        <p>{book.author}</p>
                                    </Card.Text>
                                    <Button variant="primary"
                                            onClick={()=>{this.handleView(book)}}
                                            rel={"noopener noreferrer"}>
                                        Learn More
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )})}
                </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

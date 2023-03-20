import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { transpileModule } from 'typescript';
import _ from 'lodash';
 import img_ from '../../assets/images/bruce-mars.jpg';
class CartItemDetails extends Component {
    

    constructor(props){
        super(props);
        this.state = {
            book:null,
            id:0,
            title:'',
            author:'',
            description:'',
            publishing_day:'',
            pages:0,
            type:'',
            photo:null,
            SaveDisabled:true,
            EditDisabled:false,
            imgURL:'',
            quantity:0,
        }
        
    }


    state = {

    }

    componentDidMount() {
        let book = this.props.currentBook;
        let id = book.id;
        let bookImg = null;
        // let json_ = JSON.stringify({
        //     fileName:
        // })
        //const json__ = '{"fileName":'+book.photo_name+',}';
        // const obj = JSON.stringify({fileName:});
        // console.log('json object',obj)
  

        if (book && !_.isEmpty(book)){ 

            let json = JSON.stringify(book.photo_data)
            
            let blob = new Blob([book.photo_data]);
            let file = new File([json],"D:/Book/demo_2/src/main/resources/static/item-photos/"+book.id+"/" + book.photo_name, {type: book.photo_type});
           
            let exportUrl =URL.createObjectURL(file);
            // var binaryData = [];
            // binaryData.push(book.photo_data);
            // window.URL.createObjectURL(new Blob(binaryData, {type: book.photo_type}))
           
            this.setState({
                id:book.id,
                title: book.title,
                author:book.author,
                quantity:book.quantity
            })
            console.log('edit LOG PHOTO',exportUrl,file)
        }
        if (book.id==0){
            this.setState({
                EditDisabled:true,
                SaveDisabled:false
            })
        }

        let img__ = '../../assets/images/bruce-mars.jpg';
        console.log(this.state.imgURL)
    }

    toggle = ()=>{
        this.props.toggleFromParent();
       
    }
    handleOnChangeInputQuantity = (event) => {
        this.setState({
            quantity: event.target.value,
        })
        
    }
    
    saveQuantity = () =>{


        sessionStorage.setItem(this.props.currentBook.id,this.state.quantity)



        this.toggle();
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
                <ModalHeader toggle={()=>{this.toggle()}}>Book Details</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className='row1' >
                            
                                <br />
                                
                                <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Title</span>
                                </div>
                                    <input 
                                        type="text" 
                                        value = {this.state.title}
                                        
                                        class="form-control"
                                    />
                                </div>

                                <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Author</span>
                                </div>
                                    <input 
                                        type="text" 
                                        value = {this.state.author}
                                        
                                        class="form-control"
                                    />
                                </div>

                                
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">Quantity</span>
                                    </div>
                                        <input 
                                            type="number" 
                                            value = {this.state.quantity}
                                            onChange={(event)=>this.handleOnChangeInputQuantity(event)}
                                            class="form-control"
                                        />
                                </div>
                        </div>

                        
                         
                    </div>
                    
                </ModalBody>
                <ModalFooter>
                    
                    <button id="buttonSave" color="primary" onClick={()=>{
                        this.saveQuantity()
                        }} >
                        Save
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

export default connect(mapStateToProps, mapDispatchToProps)(CartItemDetails);



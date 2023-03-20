import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { transpileModule } from 'typescript';
import _ from 'lodash';
 import img_ from '../../assets/images/bruce-mars.jpg';
class BookDetails extends Component {
    

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
            //let file = new File([json],"D:/Book/demo_2/src/main/resources/static/item-photos/"+book.id+"/" + book.photo_name, {type: book.photo_type});
           
            //let exportUrl =URL.createObjectURL(file);
            // var binaryData = [];
            // binaryData.push(book.photo_data);
            // window.URL.createObjectURL(new Blob(binaryData, {type: book.photo_type}))
           
            this.setState({
                id:book.id,
                title: book.title,
                author:book.author,
                description:book.description,
                publishing_day:book.publishing_day,
                pages:book.pages,
                type:book.type,
                //photo:file,
                imgURL: "http://localhost:8080/Books/"+book.id+"/"+book.photo_name
            })
            //console.log('edit LOG PHOTO',exportUrl,file)
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
    
    handleBuyBook = () =>{
        if(this.state.quantity<=0){
            if (window.confirm("Quantity must be greater than 0")) {
                
          }
        }else{
            let item=sessionStorage.getItem(this.props.currentBook.id);
            
            if (!item){
                var arr=[];
                arr.push(sessionStorage.getItem("id"));
                arr.push(this.props.currentBook.id);
                sessionStorage.setItem(this.props.currentBook.id,this.state.quantity)
                sessionStorage.setItem("id",arr);
                
            }else{
                sessionStorage.setItem(this.props.currentBook.id,parseInt(this.state.quantity)+parseInt(item))
            }
            console.log('mang',arr);

            this.toggle();
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
                                    <span class="input-group-text" id="basic-addon1">Description</span>
                                </div>
                                    <input 
                                        type="text" 
                                        value = {this.state.description}
                                      
                                        class="form-control"
                                    />
                                </div>
                                <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Published in</span>
                                </div>
                                    <input 
                                        type="date" 
                                        value = {this.state.publishing_day}
                                    
                                        class="form-control"
                                    />
                                </div>
                                <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Pages</span>
                                </div>
                                    <input 
                                        type="number" 
                                        value = {this.state.pages}
                                        class="form-control"
                                    />
                                </div>
                                <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Type</span>
                                </div>
                                    <input 
                                        type="text" 
                                        value = {this.state.type}
                          
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
                        <div className='row2'>
                    
                            <img src={this.state.imgURL} alt="sai anh" />
                     
                        </div>
                        
                         
                    </div>
                    
                </ModalBody>
                <ModalFooter>
                    
                    <button id="buttonSave" color="primary" onClick={()=>{
                        this.handleBuyBook()
                        }} >
                        Add to cart
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

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);



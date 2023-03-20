import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { transpileModule } from 'typescript';
import _ from 'lodash';
 import img_ from '../../assets/images/bruce-mars.jpg';
class ModalBook extends Component {
    

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
            imgURL:''
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
            let file = new File([json],book.photo_name, {type: book.photo_type});
           
            let exportUrl =URL.createObjectURL(file);
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
                photo:file,
                imgURL: "http://localhost:8080/Books/"+book.id+"/"+book.photo_name
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
    checkValidInput = () => {
        let isValid = true;
        if ((!this.state.title)|| (!this.state.author)||(!this.state.description)||(!this.state.publishing_day)||(!this.state.pages)||(!this.state.type)){
            isValid = false;
            alert('Please fill in all fields !')
        }
        return isValid;
    }

    handleOnChangeInputTitle = (event) => {
        this.setState({
            title: event.target.value,
        })
        //console.log(props.Book);
        //console.log(this.props.Book.id);
    }
    handleOnChangeInputAuthor = (event) => {
        this.setState({
            author: event.target.value,
        })

    }
    handleOnChangeInputPublishing_day = (event) => {
        this.setState({
            publishing_day: event.target.value,
        })

    }
    handleOnChangeInputPages = (event) => {
        this.setState({
            pages: event.target.value,
        })

    }
    handleOnChangeInputType = (event) => {
        this.setState({
            type: event.target.value,
        })

    }
    handleOnChangeInputDescription = (event) => {
        this.setState({
            description: event.target.value,
        })
        
    }
    handleFileChange = (event) => {
        this.setState({
            photo: event.target.files[0],
            imgURL: window.webkitURL.createObjectURL(event.target.files[0])
        })
        let img_= event.target.files[0].name;
         console.log('IMGG', this.state.imgURL, event.target.files[0]);
         //const [fileDataURL, setFileDataURL] = useState(null);
      };
    // handleOnChangeInputAuthor = (event) => {
    //     this.setState({
    //         author: event.target.value,
    //     })
    //     console.log(this.state.author)
    // }
    handleSaveBook = () =>{

        this.setState({
            errMessage:''
        })
        let isValid =this.checkValidInput();
        if (isValid===true){
            this.props.editBook(this.state);
            //let data = await handleLogin(this.state.username, this.state.password);
            const book = {
                title : this.state.title,
                author : this.state.author,
                publishing_day : this.state.publishing_day,
                pages : this.state.pages,
                type : this.state.type,
                description : this.state.description,
                photo: this.state.photo,
            };

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
                                    <span class="input-group-text" id="basic-addon1">ID</span>
                                </div>
                                    <input 
                                        type="number" 
                                        value = {this.state.id}
                                        onChange={(event)=>this.handleOnChangeInputTitle(event)}
                                        disabled
                                        name="id"
                                        
                                        class="form-control"
                                    ></input>
                                </div>
                                <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Title</span>
                                </div>
                                    <input 
                                        type="text" 
                                        value = {this.state.title}
                                        onChange={(event)=>this.handleOnChangeInputTitle(event)}
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
                                        onChange={(event)=>this.handleOnChangeInputAuthor(event)}
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
                                        onChange={(event)=>this.handleOnChangeInputDescription(event)}
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
                                        onChange={(event)=>this.handleOnChangeInputPublishing_day(event)}
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
                                        onChange={(event)=>this.handleOnChangeInputPages(event)}
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
                                        onChange={(event)=>this.handleOnChangeInputType(event)}
                                        class="form-control"
                                    />
                                </div>
                            
                        </div>
                        <div className='row2'>
                    
                            <img src={this.state.imgURL} alt="sai anh" />
                     
                        </div>
                        <div>
                            <input type="file" 
                            
                            onChange={(event)=>this.handleFileChange(event)}
                             multiple />


                        </div>
                         
                    </div>
                    
                </ModalBody>
                <ModalFooter>
                    <button color="primary" onClick={()=>{
                                        this.setState({SaveDisabled:false,})
                                        console.log(this.state.imgURL)
                                    }}
                                    disabled={this.state.EditDisabled}>
                        Edit
                    </button>{' '}
                    <button id="buttonSave" color="primary" onClick={()=>{this.handleSaveBook()}} disabled={this.state.SaveDisabled}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalBook);



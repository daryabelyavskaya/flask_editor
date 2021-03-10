import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import {  Redirect } from 'react-router-dom';
import regeneratorRuntime from "regenerator-runtime";
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import { compose } from 'recompose'
import { find } from 'lodash';
import 'jodit';
import 'jodit/build/jodit.min.css';
import {
  withStyles,
  Fab,
  IconButton,
} from '@material-ui/core';


import {
     Delete as DeleteIcon,
     Add as AddIcon,
     Edit as EditIcon,
     ArrowForwardIos as ArrowForwardIosIcon
} from '@material-ui/icons';

import From from './From'
import Common from './common/Common'
import DocumentForm from './DocumentForm'
import LogInForm from './UserForm'
import {  authenticationService } from './AuthService';
const APP_API = process.env.APP_API || "http://127.0.0.1:5000/api/v1/" ;

require("regenerator-runtime/runtime");

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
});


class DocumentManager extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        documents: [],
        error: null,
        isEdit: false,
        editId: '',
        modal: false,
        auth: false,
        token: null,
        st: false
    };
  }
  
  async fetch(method, endpoint, body) {
    try {
      const response = await fetch(`${APP_API}${endpoint}`, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser')).user.token}`,
          'content-type': 'application/json',
          accept: 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
  
      this.setState({ error });
    }
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }))
    this.getDocuments();
  }

  async getDocuments() {
      this.setState(
          {
              loading: false,
              documents: (await this.fetch('get', 'documents/')) || []
          });
  }
  getUser = async (user) => {
    let response= await authenticationService.login(user['username'],user['password'])
    let user_info=await response.json()
    localStorage.setItem('currentUser', JSON.stringify(user_info));
    if (user_info['ok']){
      this.setState({auth: true})
    }
    this.setState({st:true})
    this.getDocuments()
  }

  postDocuments = async (document) => {
        document['status']="Creating"
        document['content']=""
        await this.fetch('post', 'documents/',document );
        this.handleModalClose()
        this.getDocuments()
  }
  
   async deleteDocument(document) {
       await this.fetch('delete', `documents/${document._id}/`);
       this.getDocuments();
    }
    
  renderDocumentEditor = ( _id ) => {
      if (this.state.loading) return null;
      const document = find(this.state.documents, { _id: _id });
      return <From document={document}  handleOffisEdit={this.handleOffisEdit} />;
    };
  handleIsEdit(_id){
    this.setState({isEdit: true});
    this.setState({editId: _id});
   }
   handleOffisEdit=()=>{
    
		this.setState({isEdit: false});
	}
  handleModalOpen=()=>{
    this.setState({modal: true});
   }
   handleModalClose=()=>{
    this.setState({modal: false});
   }
  render() {
    const { classes } = this.props;
    if (!this.state.st){
      return(
        <Common>
          <LogInForm onSave={this.getUser}></LogInForm>
        </Common>
      )
    }
    else{
    if (this.state.isEdit){
      return(
        <Common>
        <div >
          {this.renderDocumentEditor(this.state.editId)}
        </div>
        </Common>
      )
    }
    else{
    if (this.state.modal){
      return(
        <Common>
        <DocumentForm  onSave={this.postDocuments} handleModalClose= {this.handleModalClose}>
        </DocumentForm>
        </Common>
      )
    }
    else{
    return (
      <Common>
            <CardColumns>{
                this.state.documents.map((item) =>
                <Card
                   id={item._id}
                   className="text-center"
                   border="info"
                   style={{width: '18rem'}}
                    >
                 <Card.Body>
                   <Card.Title
                       className="text-primary">
                       <h3>{item.name}</h3>
                   </Card.Title >
                   <Card.Text>
                       STATUS :{item.status}
                   </Card.Text>
                 </Card.Body>
                 <Card.Footer>
                   <IconButton
                        onClick={() => this.deleteDocument(item)} color="inherit"
                        >
                       <DeleteIcon color="secondary"/>
                   </IconButton>
                   <IconButton
                        onClick={() => this.handleIsEdit(item._id) } color="inherit"
                       >
                       <EditIcon color="primary"/>
                   </IconButton>
                 </Card.Footer>
               </Card>
             )}
            </CardColumns>
            <Fab
          size="medium"
          color="secondary"
          aria-label="add"
          onClick={() => this.handleModalOpen()}
        >
          <AddIcon   />
        </Fab>
          </Common>
    );
  }
}
}
}
}
export default compose(
  withStyles(styles),
)(DocumentManager);

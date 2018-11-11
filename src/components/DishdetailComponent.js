import React, {Component} from 'react';
import { 
  Card, 
  CardImg, 
  CardText, 
  CardBody,
  CardTitle, 
  Breadcrumb, 
  BreadcrumbItem, 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody,
  Form, 
  FormGroup, 
  Input, 
  Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
        isModalOpen: false,
        dropdownOpen: false,
        name: '',
        rating: '',
        comment: '',
        touched: {
          name: false,
          rating: false,
          comment: false
        }
    };
  }

  handleSubmit(values) {
     console.log('Current State is: ' + JSON.stringify(values));
     alert('Current State is: ' + JSON.stringify(values));
     // event.preventDefault();
 }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    return (
      <React.Fragment>
      <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.handleSubmit}>

                <FormGroup>
                    <Label htmlFor="raiting">Rating</Label>
                    <div className="dropdown">
                      <Control.select model=".rating" id="rating" className="col-12 btn btn-outline-secondary dropdown-toggle">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </Control.select>
                    </div>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="name">Your Name</Label>
                  <Control.text model=".name" id="name" name="name"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                        minLength: minLength(3), maxLength: maxLength(15)
                    }}
                     />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </FormGroup>

                 <FormGroup>
                    <Label htmlFor="comment">Comment</Label>
                    <Control.textarea model=".comment" id="comment" name="comment"
                                      rows="6"
                                      className="form-control" />
                </FormGroup>

                <Button type="submit" value="submit" color="primary">Submit</Button>
            </LocalForm>
          </ModalBody>
      </Modal>
      </React.Fragment>
    )
  }
};

const RenderDish = ({dish}) => {
    if (dish != null) {
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    } else {
      return (
        <div></div>
      );
    }
  }

  const RenderComments = ({comments}) => {
    if (comments != null) {
      return (
        <div>
          <h4>Comments</h4>
          <ul className='list-unstyled'>
            {comments.map(item => {
              return (
                <li className="mb-3" key={item.id}>
                  <p className="mb-0">{item.comment}</p>
                  <div>-- {item.author}, {
                    new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit'
                    }).format(new Date(Date.parse(item.date)))
                  }</div>
                </li>
              );
            })}
          </ul>
          <CommentForm />
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }

const DishDetail = (props) => {
	if (props.dish != null) {
	  return (
          <div className="container">
          <div className="row">
              <Breadcrumb>

                  <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                  <h3>{props.dish.name}</h3>
                  <hr />
              </div>                
          </div>
          <div className="row">
              <div className="col-12 col-md-5 m-1">
                  <RenderDish dish={props.dish} />
              </div>
              <div className="col-12 col-md-5 m-1">
                  <RenderComments comments={props.comments} />
              </div>
          </div>
          </div>
      );
	} else {
	  return (
	    <div></div>
	  );
	}
}

export default DishDetail;

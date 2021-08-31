import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Modal, Form } from 'react-bootstrap'
import axios from 'axios';

class FavCrypto extends React.Component {
  constructor() {
    super();
    this.state = {
      favArray: [],
      title: '',
      description: '',
      toUSD: '',
      image: '',
      showModal :false
    }
  }

  componentDidMount = () => {


    const requestconfig = {
      method: 'get',
      baseurl: process.env.REACT_APP_URL,
      url: '/fav-Crypto',

    }

    axios(requestconfig).then(response => {
      this.setState({
        favArray: response
      })
    })
  }


  deletefav = (items, id) => {
    axios.delete(`${process.env.REACT_APP_URL}/favorite/${id}`)
      .then(response => {
        if (response.status === 200) {
          alert('Deleted')
          window.location.reload();
        }
      })
  }

  modalShow=()=>{
    this.setState ({
      showModal:true 
    })
  }



  closeModal=()=>{
    this.setState ({
      showModal: false ,
      
    })
  }

  render() {
    return (
      <>
        {this.state.favArray.map((items, id) => {
          return (
            <>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={items.image} />
                <Card.Body>
                  <Card.Title>{items.title}</Card.Title>
                  <Card.Text>
                    {items.description}
                  </Card.Text>
                  <Button variant="primary" onClick={this.deletefav(items)}>Delete</Button>
                  <Button variant="primary" onClick={this.modalShow()}>Update</Button>
                </Card.Body>
              </Card>
            </>
          )
        }

        )

        }

        <Modal.Dialog onShow={this.state.showModal}  onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onClick={this.updated()}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Crypto Title</Form.Label>
                <Form.Control type="text" onChange={this.updatehandle} defaultValue={this.state.title} />
                <Form.Text className="text-muted">
                  {this.state.description}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>toUSD</Form.Label>
                <Form.Control type="text" onChange={this.updatehandle} defaultValue={this.state.toUSD}/>
              </Form.Group>
             
              <Button variant="primary" type="submit" >
              Save changes
              </Button>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            
          </Modal.Footer>
        </Modal.Dialog>
      </>
    )
  }
}

export default FavCrypto;

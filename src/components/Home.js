import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      cryptoData: [] ,
      title : '',
      description : '' ,
      toUSD : '' ,
      image : '' ,
    }
  };


  componentDidMount = () => {
    let url = ('http://localhost:3001/Crypto')
    axios.get(url).then(cryptoArray => {
    
      this.setState({
        cryptoData: cryptoArray
      })
      console.log(this.state.cryptoData)
    })
  }



  addtofav =(items)=>{
    const { title , id , description , toUSD, image } = items ; 
    // http://localhost:3001/favorite)

    const requestconfig = {
      method : 'post' ,
      baseurl : process.env.REACT_APP_URL ,
      url : '/favorite' ,
      params :{
        title: title,
        description: description,
        toUSD: toUSD,
        image: image,
        id: id
      }

    }
    axios(requestconfig).then(response=>{
      if(response.status === 200){
        alert('done')
      }
    })


  }
  render() {


    return (
      <>
        {this.state.cryptoData.map(items => {
          return (
            <React.Fragment>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={items.image} />
                <Card.Body>
                  <Card.Title>{items.title}</Card.Title>
                  <Card.Text>
                    {items.description}
                  </Card.Text>
                  <Button variant="primary" onClick={this.addtofav(items)}>Add-To-watch-list</Button>
                </Card.Body>
              </Card>
              </React.Fragment>
          )
        }

        )

        }
      </>
    )






  }
}

export default Home;


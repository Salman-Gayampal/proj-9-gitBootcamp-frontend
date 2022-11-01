import { useState, useEffect } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import Resources from './Resources'

export default function CourseCard({courseProp}){

    // checks to see if the data wass successfully passed
    //console.log(coursesData);

    // Every component receives in a form of an object
    //console.log(console.log[0]);

    //console.log({courseProp});

    const { name, description, price, _id } = courseProp;

    /*
      Use the state hook for this component to be able to store its state. States are used to keep track of the infomration related to individual components/elements

      Synatx:
        const [getter, setter] = useState(initialGetterValue);
    */

    // state hook to store the state of enrollees
    const [count, setCount] = useState(0);
    const [seats, setSeats] = useState(10);


    //console.log(useState(0));

    function enroll(){
      if (seats > 0 ) {
        setCount(count + 1)
        console.log('Enrollees: ' + count)
        setSeats(seats - 1)
        console.log('Seats: ' + seats)
      } //else {
        //alert("No more seats available.")
      //}
    };


    useEffect(() => {
        if (seats === 0) {
            alert("No more seats available.")
        }
    }, [seats])
  


  return(

    <Row>
      <Col lg={{span:6, offset:3}}>
        <Card className="courseCard my-3">
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Subtitle>Description:</Card.Subtitle>
              <Card.Text>{description}</Card.Text>
              <Card.Subtitle>Price:</Card.Subtitle>
              <Card.Text>{price}</Card.Text>
              <Button className="bg-primary" as={Link} to={`/courses/${_id}`} >Details</Button>
              </Card.Body>
          </Card>
      </Col>
    </Row>

  )
}
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function BootstrapCards(props) {
  const dp = "http://127.0.0.1:8000" + (props.dp)
  console.log("this", dp)
  
  return (
    <div style={{display: "flex", justifyContent: "space-between"}}>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={dp} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
            <h6>Age: {props.age}</h6>
            <h6>Email: {props.email}</h6>
            <h6>Designation: {props.designation}</h6>
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </div>
  );
}

export default BootstrapCards;
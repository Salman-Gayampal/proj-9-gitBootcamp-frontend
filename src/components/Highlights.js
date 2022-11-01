import { Row, Col, Card } from 'react-bootstrap';


export default function Highlights() {
	return (

		<Row className="mt-3 mb-3">
			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
				     <Card.Body>
				       <Card.Title>Learn From Home</Card.Title>
				       <Card.Text>
				       Learn coding while in the comfort of your home.
				       </Card.Text>
				     </Card.Body>
				</Card>
			</Col>

			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
				     <Card.Body>
				       <Card.Title>Study Now, Pay Later</Card.Title>
				       <Card.Text>
				         Finish the bootcamp first, then pay us back after you get a job.
				       </Card.Text>
				     </Card.Body>
				</Card>

			</Col>

			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3">
				     <Card.Body>
				       <Card.Title>Be Part of Our Community</Card.Title>
				       <Card.Text>
				         Apply as an instructor and share your knowledge and experience with other aspiring developers.
				       </Card.Text>
				     </Card.Body>
				</Card>

			</Col>
		</Row>
			
	)
};
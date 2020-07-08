import React from "react"
import { Card } from 'react-bootstrap'

const Snakes = (props) => {
    return (

        < Card bg='light' style={{ width: '30rem' }}>
            <Card.Body>
                <Card.Title>{props.data.longName}</Card.Title>
                <Card.Img variant="top" src={props.data.image} />
                <Card.Subtitle>({props.data.sciName})</Card.Subtitle>
                <Card.Text style={{ textAlign: 'left' }}>
                    {props.data.description}
                </Card.Text>
            </Card.Body>
        </Card >


    )
}

export default Snakes
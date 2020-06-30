import React from "react"
import { Card } from 'react-bootstrap'

const Snakes = () => {
    return (

        <Card>
            <Card.Body>
                <Card.Img variant="left" src="../assets/snake.png" />
                <Card.Title>Coachwhip Snake</Card.Title>
                <Card.Subtitle>(Masticophis flagellum)</Card.Subtitle>
                <Card.Text>
                    is a species of nonvenomous colubrid snake,
                    commonly referred to as the coachwhip or the whip snake,
                    which is endemic to the United States and Mexico. Coachwhips are diurnal,
                    and actively hunt and eat lizards, small birds, and rodents.
                    Coachwhips subdue prey by grasping and holding them with their jaws and do not use constriction.
                    [6] They tend to be sensitive to potential threats,
                    and often bolt at the first sign of one; they are extremely fast-moving snakes.
                    They are curious snakes with good eyesight, and are sometimes seen raising their heads above the level of the
                    grass or rocks to see what is around them. They can slither up to 15 mph.
                </Card.Text>
            </Card.Body>
        </Card>

    )
}

export default Snakes
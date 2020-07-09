import React from 'react'
import { Button, Card } from 'react-bootstrap'
import snake from '../assets/snake.png'
const About = () => {
    return (
        <div className="pic-container">
            <Card bg='light' style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Img variant='top' className={'card-img-top'} src={snake} />
                    <Card.Text></Card.Text>
                    <Card.Title>
                        Central Texas A.I. Snake Identifier
                    </Card.Title>
                    <Card.Text style={{ textAlign: "left" }}>
                        <p>Snake id  is a simple machine learning project aiming to identify snakes commonly found in central Texas.</p>
                        <p>The project was created as part of a Machine Learning group project for the Visualization and Data Analysis course at UT@Austin </p>
                        <p>It utilizes the TensorFlow framework and TensorFlow Hub to ingest pre trained images. </p>
                        <p>For a detailed explanation and tutorial read the <a href='https://www.tensorflow.org/hub/tutorials/image_retraining'> Image retraining tutorial </a> at the TensorFlow website</p>
                        <div>
                            Mauricio Gonzalez<br />
                            Juan L. Galeazzi<br />
                            David Marcus<br />
                            Mukit Samad<br />
                        </div>

                    </Card.Text >
                </Card.Body >
            </Card >
        </div >
    )
}


export default About
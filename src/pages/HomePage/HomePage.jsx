import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import styles from './HomePage.module.css';

class HomePage extends Component {
    render () {
        return (
            <div className="container">
                <Carousel className={styles.addPaddingCoursel}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/Carousel_001.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>It’s all coming together</h3>
                            <p>When you’re on top of your money, life is good. We help you effortlessly manage your finances in one place.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/Carousel_002.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Budgets made simple</h3>
                            <p>Easily create budgets, and see our suggestions based on your spending.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="/Carousel_003.jpg"
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>User-friendly</h3>
                        <p>Bills are now easier than ever to track. </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="/Carousel_004.jpg"
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>Be the next Tony Stark</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <CardDeck className={styles.addPaddingCardDeck}>
                    <Card>
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Body>
                        <Card.Title>My Lists</Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Body>
                        <Card.Title>New List</Card.Title>
                        <Card.Text>
                            This card has supporting text below as a natural lead-in to additional
                            content.{' '}
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Body>
                        <Card.Title>Products Manager</Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This card has even longer content than the first to
                            show that equal height action.
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                </CardDeck>
            </div>
        );
    };
};

export default HomePage;
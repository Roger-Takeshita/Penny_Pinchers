import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                </Carousel>
                <CardDeck className={styles.addPaddingCardDeck}>
                    <Card className="align-items-center">
                        <Card.Img className="w-50 pt-4" variant="top" src="/Icons_001.png" />
                        <Card.Body>
                            <Card.Title><Link to="/lists">My Lists</Link></Card.Title>
                        </Card.Body>
                    </Card>
                    <Card className="align-items-center">
                        <Card.Img className="w-50 pt-4" variant="top" src="/Icons_002.png" />
                        <Card.Body>
                            <Card.Title><Link to="/newlist">New List</Link></Card.Title>
                        </Card.Body>
                    </Card>
                    <Card className="align-items-center">
                        <Card.Img className="w-50 pt-4" variant="top" src="/Icons_003.png" />
                        <Card.Body>
                            <Card.Title><Link to="/products">Product DB</Link></Card.Title>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </div>
        );
    };
};

export default HomePage;
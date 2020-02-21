import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

class AboutPage extends Component {
    render () {
        return (
            <div className="container">
                <div id="profile">
                    <ListGroup variant="flush">
                        <ListGroup.Item><Image src="https://avatars3.githubusercontent.com/u/32579177?s=460&v=4" alt="profile-pic" roundedCircle width="300px"/></ListGroup.Item>
                        <ListGroup.Item>
                            <div id="contact">
                                <div><h3>Roger Takeshita</h3></div>
                                <div><strong>Full-Stack Developer</strong></div>
                                <br/>
                                <div>
                                    <div>
                                        Follow me at:
                                    </div>
                                    <div>
                                        <a href="https://github.com/Roger-Takeshita" target="blank"><img src="/github.png" alt="github"/></a>&nbsp;&nbsp;&nbsp;
                                        <a href="https://www.linkedin.com/in/roger-takeshita/" target="blank"><img src="/linkedin.png" alt="linkedin"/></a>&nbsp;&nbsp;&nbsp;
                                        <a href="https://www.instagram.com/roger.takeshita/" target="blank"><img src="/instagram.png" alt="instagram"/></a>&nbsp;&nbsp;&nbsp;
                                        <a href="https://www.youtube.com/channel/UCTA3Kd4KxeD6GnZCfLZbYaA" target="blank"><img src="/yt.png" alt="youtube"/></a>
                                    </div>
                                    </div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
        );
    };
};

export default AboutPage;
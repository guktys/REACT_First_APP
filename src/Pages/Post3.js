import React, {Component} from 'react';
import {Container, Col, Row, Card, ListGroup,Nav, NavItem} from "react-bootstrap";
import third_post from "../assets/pexels-valeria-november-16146373.jpg";
export const data_post3="05.05.2023";
export const post3 = [{id: '05.05.2023', title: 'Third post', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ipsum vel\\n" +\n' +
        '    "                                    massa suscipit, vel convallis augue maximus. Vivamus id risus consequat, molestie\\n" +\n' +
        '    "                                    lacus at, ultrices velit. Fusce bibendum justo non dui vestibulum consectetur.',url:'/Post3',image:'pexels-valeria-november-16146373.jpg',stars:'2'}]
class Post3 extends Component {
    render() {
        return(
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={third_post} />
                            <Card.Body>
                                <Card.Title>Third post</Card.Title>
                                <Card.Text>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ipsum vel
                                    massa suscipit, vel convallis augue maximus. Vivamus id risus consequat, molestie
                                    lacus at, ultrices velit. Fusce bibendum justo non dui vestibulum consectetur.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Post3;
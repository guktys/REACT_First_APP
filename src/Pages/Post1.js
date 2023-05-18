import React, {Component} from 'react';
import {Container, Col, Row, Card, ListGroup,Nav, NavItem} from "react-bootstrap";
import first_post from "../assets/pexels-alina-vilchenko-2698519.jpg";
export const data_post1 ="07.05.2023";
export const post1 = [{id: '07.05.2023', title: 'First post', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ipsum vel\\n" +\n' +
        '    "                                    massa suscipit, vel convallis augue maximus. Vivamus id risus consequat, molestie\\n" +\n' +
        '    "                                    lacus at, ultrices velit. Fusce bibendum justo non dui vestibulum consectetur.',url:'/Post1',image:"pexels-alina-vilchenko-2698519.jpg"}]
class Post1 extends Component {

    render() {

        return(
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={first_post} />
                            <Card.Body>
                                <Card.Title>First post</Card.Title>
                                <Card.Text>
                                    {data_post1}
                                    <br></br>
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

export default Post1;
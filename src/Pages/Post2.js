import React, {Component} from 'react';
import {Container, Col, Row, Card, ListGroup,Nav, NavItem} from "react-bootstrap";
import second_post from "../assets/pexels-si-luan-pham-8778442.jpg";
export const data_post2="06.05.2023";
export const post2 = [{id: '06.05.2023', title: 'Second post', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ipsum vel\\n" +\n' +
        '    "                                    massa suscipit, vel convallis augue maximus. Vivamus id risus consequat, molestie\\n" +\n' +
        '    "                                    lacus at, ultrices velit. Fusce bibendum justo non dui vestibulum consectetur.',url:'/Post2',image:'pexels-si-luan-pham-8778442.jpg'}]
class Post2 extends Component {
    render() {
        return(
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={second_post} />
                            <Card.Body>
                                <Card.Title>Second post</Card.Title>
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

export default Post2;
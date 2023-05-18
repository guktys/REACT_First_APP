import React, {Component} from 'react';
import {Container, Col, Row, Card, ListGroup, Nav, NavItem, Button} from "react-bootstrap";
import first_post from "../assets/pexels-alina-vilchenko-2698519.jpg";
import second_post from "../assets/pexels-si-luan-pham-8778442.jpg";
import third_post from "../assets/pexels-valeria-november-16146373.jpg";
import {data_post1} from "./Post1";
import {post1} from "./Post1.js";
import {data_post2} from "./Post2";
import {post2} from "./Post2.js";
import {data_post3} from "./Post3";
import {post3} from "./Post3.js";
import '../blog.css';
class Blog extends Component {
    dataArray(){
        let posts = [];
        posts.push(post2);
        posts.push(post3);
        posts.push(post1);
        console.log(posts);
        return(posts);
    }
    dataSort () {

        let sortedPosts = this.dataArray()
            .flat() // Разглаживаем многомерный массив
            .sort((a, b) => new Date(b.id.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')) - new Date(a.id.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')))
            .map((post, index) => {

                return (
                    <div key={index} className="d-flex align-items-center me-5">
                        <NavItem>
                            <Nav.Link href={post.url} style={{ color: 'black' }}>
                                <div className="flex-shrink-0">
                                    <img
                                        width={150}
                                        height={150}
                                        className="mr-3"
                                        alt="photo"
                                    />
                                    <div className="flex-grow-1 ms-3">
                                        <h5>{post.title}</h5>
                                        <p>{post.id}</p>
                                    </div>
                                </div>
                            </Nav.Link>
                        </NavItem>
                    </div>
                );
            });
        // Вывод переменной sortedPosts в консоль
        return sortedPosts;
    };
    dataContainer(array) {
        const mappedPosts = array
            .flat()
            .map((post, index) => {
                const img = require(`../assets/${post.image}`).default;

                return (
                    <div key={index} className="d-flex align-items-center me-5">
                        <NavItem>
                            <Nav.Link href={post.url} style={{ color: 'black' }}>
                                <div className="flex-shrink-0">
                                    <div source={img}></div>
                                    <img width={150} height={150} className="mr-3" src={img} alt="photo" />
                                    <div className="flex-grow-1 ms-3">
                                        <h5>{post.title}</h5>
                                        <p>{post.id}</p>
                                    </div>
                                </div>
                            </Nav.Link>
                        </NavItem>
                    </div>
                );
            });

        return mappedPosts;
    }


    render() {
        let test=this.dataContainer(this.dataArray());

        return (

            <div className={"temp"}>
                <Row>
                    <Col md="9">
                        {
                            <div className="Posts">
                                <Button className="Top" onClick={() => this.dataSort()}>↑</Button>
                                <Button className="Down" >↓</Button>
                                {test}
                            </div>
                        }
                    </Col>
                    <Col md="3">

                        <h5 className="text-center mt-5">Категорії</h5>

                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>категорія 1</ListGroup.Item>
                                <ListGroup.Item>категорія 2</ListGroup.Item>
                                <ListGroup.Item>категорія 3</ListGroup.Item>
                                <ListGroup.Item>категорія 4</ListGroup.Item>
                                <ListGroup.Item>категорія 5</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Card className="mt-3 bg-light">
                        <Card.Body>
                            <Card.Title>Slide widget</Card.Title>
                            <Card.Text>
                                Lorem
                            </Card.Text>
                        </Card.Body>
                    </Card>


                </Row>

            </div>
        );
    }
}

export default Blog;


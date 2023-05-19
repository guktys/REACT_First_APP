import React, { Component } from 'react';
import { Container, Col, Row, Card, ListGroup, Nav, NavItem, Button } from 'react-bootstrap';
import { data_post1 } from './Post1';
import { post1 } from './Post1.js';
import { post2 } from './Post2.js';
import { data_post3 } from './Post3';
import { post3 } from './Post3.js';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../blog.css';
import StarRatings from 'react-star-ratings';
class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            currentPage: 1,
            postsPerPage: 10,
            sortedPosts: null,
            isSorted: false,
            isSortedReverse: false,
        };


    }


    dataArray() {
        let posts = [];
        posts.push(post2);
        posts.push(post3);
        posts.push(post1);
        return posts;
    }

    componentDidMount() {
        const allPosts = this.dataArray();
        this.setState({ posts: allPosts });
    }

    dataSort() {
        const { posts } = this.state;

        let sortedPosts = posts
            .flat()
            .sort(
                (a, b) =>
                    new Date(b.id.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')) -
                    new Date(a.id.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1'))
            );

        this.setState({ sortedPosts, isSorted: true, isSortedReverse: false });
    }

    dataSortAnother() {
        const { posts } = this.state;

        let sortedPosts = posts
            .flat()
            .sort(
                (a, b) =>
                    new Date(a.id.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')) -
                    new Date(b.id.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1'))
            );

        this.setState({ sortedPosts, isSorted: false, isSortedReverse: true });
        console.log(sortedPosts);
    }

    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    };

    dataContainer(array) {
        const mappedPosts = array.flat().map((post, index) => {
            const img = require(`../assets/${post.image}`);

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
                                    <StarRatings
                                        rating={parseFloat(post.stars)} // Преобразование в число, если необходимо
                                        starRatedColor="blue"
                                        numberOfStars={4}
                                        name="rating"
                                    />
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
        const { posts, currentPage, postsPerPage } = this.state;
        const { sortedPosts, isSorted, isSortedReverse } = this.state;
        const no_sort = this.dataContainer(this.dataArray());

        return (
            <div className="temp">
                <Row>
                    <Col md="9">
                        <div className="Posts">
                            <Button className="Top" onClick={() => this.dataSort()}>
                                ↑
                            </Button>
                            <Button className="Down" onClick={() => this.dataSortAnother()}>
                                ↓
                            </Button>
                            {isSorted && !isSortedReverse && sortedPosts && sortedPosts.length > 0 ? (
                                this.dataContainer(sortedPosts)
                            ) : isSortedReverse && sortedPosts && sortedPosts.length > 0 ? (
                                <div className="Reverse_sort">{this.dataContainer(sortedPosts)}</div>
                            ) : (
                                <div className="No_sort">{no_sort}</div>
                            )}
                        </div>
                        <div className="Pagination">
                            <Pagination>
                                {/* Добавьте компоненты для отображения пагинации */}
                                <Pagination.First onClick={() => this.handlePageChange(1)} />
                                <Pagination.Prev
                                    onClick={() => this.handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                />
                                {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map((number) => (
                                    <Pagination.Item
                                        key={number + 1}
                                        active={number + 1 === currentPage}
                                        onClick={() => this.handlePageChange(number + 1)}
                                    >
                                        {number + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next
                                    onClick={() => this.handlePageChange(currentPage + 1)}
                                    disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
                                />
                                <Pagination.Last
                                    onClick={() => this.handlePageChange(Math.ceil(posts.length / postsPerPage))}
                                />
                            </Pagination>
                        </div>

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
                            <Card.Text>Lorem</Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </div>
        );
    }
}

export default Blog;

import React, { useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, Nav, NavItem, Row } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../blog.css';
import StarRatings from 'react-star-ratings';
import {Link} from "react-router-dom";

const Blog = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [sortedPosts, setSortedPosts] = useState(null);
    const [isSorted, setIsSorted] = useState(false);
    const [isSortedReverse, setIsSortedReverse] = useState(false);
    const [kategory,setKategory]=useState(null)


    useEffect(() => {

        fetch(`http://localhost:3001/posts`)
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('Failed to fetch posts');
                setLoading(false);
            });

        fetch(`http://localhost:3001/kategoris`)
            .then((response) => response.json())
            .then((data) => {
                setKategory(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('Failed to fetch posts');
                setLoading(false);
            });
        console.log(kategory);
    }, []);

    const dataSort = () => {
        let sortedPosts = posts
            .flat()
            .sort((a, b) => {
                const aId = a.id && typeof a.id === 'string' ? a.id : '';
                const bId = b.id && typeof b.id === 'string' ? b.id : '';

                return (
                    new Date(bId.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')) -
                    new Date(aId.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1'))
                );
            });

        setSortedPosts(sortedPosts);
        setIsSorted(true);
        setIsSortedReverse(false);
    };

    const dataSortAnother = () => {
        let sortedPosts = posts
            .flat()
            .sort(
                (a, b) =>
                    new Date(a.id.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')) -
                    new Date(b.id.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1'))
            );
        setSortedPosts(sortedPosts);
        setIsSorted(false);
        setIsSortedReverse(true);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const dataContainer = (array) => {
        const mappedPosts = []
            .concat(...array)
            .map((post, index) => {
                const img = require(`../assets/${post.image}`);

                return (
                    <div key={index} className="d-flex align-items-center me-5">
                        <NavItem>
                            <Link to={`/Post/${post.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                                <div className="flex-shrink-0">
                                    <img width={150} height={150} className="mr-3 IMG" src={img} alt="photo" />
                                    <div className="flex-grow-1 ms-3">
                                        <h5>{post.title}</h5>
                                        <p>{post.data}</p>
                                        <Link to={`/Category/${post.kategoria}`} style={{ textDecoration: 'none' }}>
                                            <p className="category">#{post.kategoria}</p>
                                        </Link>
                                        <StarRatings
                                            rating={parseFloat(post.stars)}
                                            starRatedColor="blue"
                                            numberOfStars={4}
                                            name="rating"
                                        />
                                    </div>
                                </div>
                            </Link>
                        </NavItem>
                    </div>
                );
            });

        return mappedPosts;
    };

    const no_sort = dataContainer([posts]);

    return (
        <div className="temp">
            <Row>
                <Col md="9">
                    <div className="Posts">
                        <Button className="Top" onClick={() => dataSort()}>
                            ↑
                        </Button>
                        <Button className="Down" onClick={() => dataSortAnother()}>
                            ↓
                        </Button>
                        {isSorted && !isSortedReverse && sortedPosts && sortedPosts.length > 0 ? (
                            dataContainer(sortedPosts)
                        ) : isSortedReverse && sortedPosts && sortedPosts.length > 0 ? (
                            <div className="Reverse_sort">{dataContainer(sortedPosts)}</div>
                        ) : (
                            <div className="No_sort">{no_sort}</div>
                        )}
                    </div>
                    <div className="Pagination">
                        <Pagination>
                            {/* Добавьте компоненты для отображения пагинации */}
                            <Pagination.First onClick={() => handlePageChange(1)} />
                            <Pagination.Prev
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            />
                            {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map((number) => (
                                <Pagination.Item
                                    key={number + 1}
                                    active={number + 1 === currentPage}
                                    onClick={() => handlePageChange(number + 1)}
                                >
                                    {number + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
                            />
                            <Pagination.Last
                                onClick={() => handlePageChange(Math.ceil(posts.length / postsPerPage))}
                            />
                        </Pagination>
                    </div>
                </Col>
                <Col md="3">
                    <h5 className="text-center mt-5">Categories</h5>
                    <Card>
                        <NavItem>

                            <ListGroup variant="flush">
                                {kategory && kategory.length > 0 ? (
                                    kategory.map((category, index) => (
                                        <ListGroup.Item key={index}>
                                            <Link to={`/Category/:${category.name}`}>{category.name}</Link>
                                        </ListGroup.Item>
                                    ))
                                ) : (
                                    <ListGroup.Item>No categories found</ListGroup.Item>
                                )}
                            </ListGroup>

                        </NavItem>
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
};

export default Blog;

import React, {Component, useEffect, useState} from 'react';
import {Container, Col, Row, Card, ListGroup, Nav, NavItem, Modal, Button} from "react-bootstrap";
import first_post from "../assets/pexels-alina-vilchenko-2698519.jpg";
import StarRatings from 'react-star-ratings';
import { useParams} from 'react-router-dom';
import '../post.css';
import Form from 'react-bootstrap/Form';
const Post = () => {
    const { post_id } = useParams();
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [selectedComment, setSelectedComment] = useState(null);
    const [newCommentAuthor, setNewCommentAuthor] = useState('');
    const [newCommentContent, setNewCommentContent] = useState('');
    const [newCommentTitle, setNewCommentTitle] = useState('');
    const [showModal, setShowModal] = useState(false); // Состояние для отображения/скрытия модального окна

    useEffect(() => {
if(post_id){
    fetch(`http://localhost:3001/posts/${post_id}`)
        .then((response) => response.json())
        .then((data) => {
        setPost(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            setError('Failed to fetch posts');
            setLoading(false);
        });
    fetch(`http://localhost:3001/getComm/${post_id}`)
        .then((response) => response.json())
        .then((data) => {
            setComments(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            setError('Failed to fetch posts');
            setLoading(false);
        });
}

    },[post_id ])
    const dataContainer = (array) => {
        const mappedPosts = []
            .concat(...array)
            .map((post, index) => {
                const img = require(`../assets/${post.image}`);

                return (
                    <div key={index} className=" align-items-center ">
                        <Row>
                            <Col>
                                <Card>
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <Card.Img variant="top" src={img} />
                                        </div>
                                        <div className="col-md-8">
                                            <Card.Body>
                                                <Card.Title>{post.title}</Card.Title>
                                                <Card.Text>
                                                    {post.data}
                                                    <br />
                                                    {post.content}
                                                </Card.Text>
                                            </Card.Body>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                );
            });

        return mappedPosts;
    };
    const deleteComm = (commID) => {
        fetch('http://localhost:3001/deleteComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: commID }), // Обернуть commID в объект
        })
            .then((response) => response.json())
            .then((data) => {
                // Обработка успешного ответа от сервера
                console.log('Comment delete:', data);
                window.location.reload(); // Перезагрузка страницы
            })
            .catch((error) => {
                // Обработка ошибки
                console.error('Error:', error);
            });
    };
    const showChange = (comm_id) =>{
        let comment = comments.find((comment) => comment.id === comm_id);
        setSelectedComment(comment);
        setShowModal(true);

    }
    const changeComm = (b) =>{
        b.preventDefault();
        const comment1 = {
            author: newCommentAuthor,
            title: newCommentTitle,
            content: newCommentContent,
            comm_id: selectedComment.id,
        };
        fetch('http://localhost:3001/updateComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment1),
        })
            .then((response) => response.json())
            .then((data) => {
                // Обработка успешного ответа от сервера
                console.log('Comment update:', data);
                window.location.reload(); // Перезагрузка страницы
            })
            .catch((error) => {
                // Обработка ошибки
                console.error('Error:', error);
            });

    }
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const comment = {
            author: newCommentAuthor,
            title: newCommentTitle,
            content: newCommentContent,
            post: post_id
        };

        fetch('http://localhost:3001/addComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        })
            .then((response) => response.json())
            .then((data) => {
                // Обработка успешного ответа от сервера
                console.log('Comment added:', data);
                window.location.reload(); // Перезагрузка страницы
            })
            .catch((error) => {
                // Обработка ошибки
                console.error('Error:', error);
            });
    };

        return(
            <Container>
                {dataContainer(post)}
                <div className="Comment">
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div key={index} className="CommentItem">
                                <h4>{comment.title}</h4>
                                <p>
                                    <span className="Author">{comment.author}</span>
                                    <br />
                                    <span className="Date">{comment.date}</span>
                                    <br />
                                    <span className="Text">{comment.text}</span>
                                </p>
                                <button className="btn btn-primary" onClick={() => deleteComm(comment.id)}>Delete comment</button>
                                <button className="btn btn-primary Modal"  onClick={() => showChange(comment.id)}>Edit comment</button>
                            </div>

                        ))
                    ) : (
                        <p className="NoComments">Sorry, there are no comments yet</p>
                    )}

                    <Form onSubmit={handleCommentSubmit}>
                        <Form.Group className="mb-3" controlId="commentFormAuthor">
                            <Form.Label>Your name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Имя"
                                value={newCommentAuthor}
                                onChange={(e) => setNewCommentAuthor(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="commentFormTitle">
                            <Form.Label>Comment title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Заголовок"
                                value={newCommentTitle}
                                onChange={(e) => setNewCommentTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="commentFormContent">
                            <Form.Label>Your comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newCommentContent}
                                onChange={(e) => setNewCommentContent(e.target.value)}
                            />
                        </Form.Group>
                        <button className="btn btn-primary" type="submit">
                            Отправить
                        </button>
                    </Form>



                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit comment</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={changeComm}>
                                <Form.Group className="mb-3" controlId="commentFormTitle">
                                    <Form.Label>Comment title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Заголовок"
                                        defaultValue={selectedComment ? selectedComment.title : ''}
                                        onChange={(e) => setNewCommentTitle(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="commentFormContent">
                                    <Form.Label>Your comment</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        defaultValue={selectedComment ? selectedComment.text : ''}
                                        onChange={(e) => setNewCommentContent(e.target.value)}
                                    />
                                </Form.Group>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                                        Close
                                    </Button>
                                    <Button variant="primary"   type="submit">
                                        Save
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        </Modal.Body>
                    </Modal>



                </div>
            </Container>
        );
    
}

export default Post;
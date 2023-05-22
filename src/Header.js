import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardImg,
    Container,
    Navbar,
    Nav,
    FormControl,
    Form,
    Modal,
    NavDropdown
} from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Contacts from './Pages/Contacts';
import Blog from './Pages/Blog.js';
import Post from './Pages/Post';
import Category from './Pages/Category';
import { useTranslation } from 'react-i18next';
function Header() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('Email cannot be empty');
    const [passwordError, setPasswordError] = useState('Password cannot be empty');
    const [formValid, setFormValid] = useState(false);
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    const emailHandler = (e) => {
        setEmail(e.target.value);
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!re.test(String(e.target.value.toLowerCase()))) {
            setEmailError('Incorrect email');
        } else {
            setEmailError('');
        }
    };
    const passwordHandler = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length < 3 || e.target.length > 8) {
            setPasswordError('The password must have at least 3 and no more than 8 characters');
            if (!e.target.value) {
                setPasswordError('Password cannot be empty');
            }
        } else {
            setPasswordError('');
        }
    };
    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
        }
    };

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, passwordError]);

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/Category/:categoryName" element={<Category />} component={Category} />
                    <Route path="/Post/:post_id" element={<Post />} component={Post} />
                </Routes>
            </Router>

            <Navbar fixed="top" collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        React Site
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav claccName="me-auto">
                            <Nav.Link href="/"> Home </Nav.Link>
                            <Nav.Link href="/about"> About us </Nav.Link>
                            <Nav.Link href="/contacts"> Contacts </Nav.Link>
                            <Nav.Link href="/blog"> Blog </Nav.Link>
                            <Button className="ms-2" onClick={handleShow}>
                                Login
                            </Button>
                            {/* Добавьте селектор выбора языка */}
                            <NavDropdown title={t('language')} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => changeLanguage('en')}>English</NavDropdown.Item>
                                {/* Добавьте другие языки, если необходимо */}
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl type="text" placeholder="Search" className="me-sm-3" />
                            <Button variant="outline-info">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Log in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="fromBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            {emailDirty && emailError && <div style={{ color: 'red' }}>{emailError}</div>}
                            <Form.Control
                                onChange={(e) => emailHandler(e)}
                                name="email"
                                value={email}
                                onBlur={(e) => blurHandler(e)}
                                type="email"
                                placeholder="Enter email"
                            />
                            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="fromBasicPassword">
                            <Form.Label>Password</Form.Label>
                            {passwordError && passwordDirty && <div style={{ color: 'red' }}>{passwordError}</div>}
                            <Form.Control
                                onChange={(e) => passwordHandler(e)}
                                name="password"
                                value={password}
                                onBlur={(e) => blurHandler(e)}
                                type="password"
                                placeholder="Enter password"
                            />
                        </Form.Group>
                        <Form.Group controlId="fromBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" />
                        </Form.Group>

                        <Button disabled={!formValid} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Header;

import React, {Component} from 'react';
import Tab, { Container } from 'react-bootstrap/Tab'
import {Button, Col, Nav, NavItem, Row} from "react-bootstrap";
import OceanImg from "../assets/pexels-si-luan-pham-8778442.jpg";
import '../contact.css';
export class About extends Component {
    render() {
        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column mt-2">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Design</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="test">Team</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Program</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth">Frameworks</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fifth">Library</Nav.Link>
                            </Nav.Item>


                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <img className="d-block w-100" src="https://i.pinimg.com/originals/aa/f0/69/aaf069dc6de7618a63de784b70ad4370.jpg" alt="picture one"/>
                                <p>
                                    First
                                </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="test">
                                <div className="box">
                                    <img id={"test"} className="d-block w-100"  src={OceanImg} />
                                    <div id={"test_1"}>
                                    <h2>Вітаємо!</h2>
                                      <p >
                                        Хочете долучитися до нас?:)Напишіть нам!
                                    </p>
                                        <Button><NavItem>
                                            <Nav.Link href="/contacts" style={{color:'white'}}> Написати нам  </Nav.Link>
                                        </NavItem></Button>
                                    </div>


                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <img className="d-block w-100" src="https://s3-alpha.figma.com/hub/file/858291939/14dda654-9bf1-47a5-ba66-904aa3003c6e-cover.png" alt="picture three"/>
                                <p>
                                    Third
                                </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                <img className="d-block w-100" src="https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg" alt="picture fourth"/>
                                <p>
                                    Fourth
                                </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="fifth">
                                <img className="d-block w-100" src="https://programminglibrarian.org/sites/default/files/partnerships_2.jpg" alt="picture fifth"/>
                                <p>
                                    Fifth
                                </p>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        );
    }
}

export default About;


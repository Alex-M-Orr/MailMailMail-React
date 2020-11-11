import React, { useEffect } from "react";
import { Card, Col, Container, Navbar, Row, Image } from "react-bootstrap";
import { Redirect } from "react-router";
import { EditProfile } from "./EditProfile";
import { NavBar } from "./NavBar";
import { Feed } from "./Feed";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../reducers";
import {UserInfo} from "../states/states";



  
const initialState:UserInfo = {
    id:0,
    email:"",
    password: "",
    firstName: "",
    lastName:"",
    photo: ""
}

export const OtherProfile: React.FC = () => {
  const user = useSelector((state: RootStore) => state.otherUser);
  return (
    !sessionStorage.getItem('user')?<Redirect to="/"/>:
    <>
      <NavBar />
      <Container>
        <Row>
          <Col
            className="mt-5"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Card style={{ width: "60rem" }}>
              <Card.Body>
                <Container className="margin-20">
                  <Row>
                    <Col sm={3}>
                      <Image src="/images/defaultImage.svg" width="150" rounded />
                    </Col>
                    <Col sm={9}>
                      <div>
                        <Card.Title>
                          {user.user.firstName} {user.user.lastName}
                        </Card.Title>
                        {/* <Card.Subtitle className="mb-2" id="birthdayCard">
                          Birthday
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2" id="jobCard">
                          Job Title
                        </Card.Subtitle> */}
                        <EditProfile />
                      </div>
                    </Col>
                  </Row>
                </Container>
                <Navbar className="blue" variant="dark">
                  <Navbar.Brand className="mr-auto" href="#home">
                    Posts
                  </Navbar.Brand>
                  <Navbar.Brand className="mr-auto" href="#home">
                    Photos
                  </Navbar.Brand>
                  <Navbar.Brand className="mr-auto" href="#home">
                    About
                  </Navbar.Brand>
                  <Navbar.Brand href="#home">Friends</Navbar.Brand>
                </Navbar>
                {/* Posts here */}
                <Feed/>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
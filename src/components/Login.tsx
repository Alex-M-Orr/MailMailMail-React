import React, { useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { onLogin } from "../actions/actions";
import { RootStore } from "../reducers";
import { UserState } from "../states/states";
import { ForgotPass } from "./ForgotPass";
import { Register } from "./Register";
import configData from "../config.json";

const axios = require("axios");

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state: RootStore) => state.login);

  useEffect(() => {
    createSession();
  }, [user]);

  useEffect(() => {
    if (sessionStorage.getItem("user") != null) {
      window.location.href = "./home";
    }
  }, []);

  const createSession = () => {
    if (user.email) {
      window.sessionStorage.setItem("user", JSON.stringify(user));
    }
  };

  /*
   * Callback that calls the dispatcher
   */
  const setUser = (u: UserState) => {
    dispatch(onLogin(u));
  };

  const loginSubmit = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    loginUser(form[0].value, form[1].value);
  };

  async function loginUser(userEmail: string, userPassword: string) {
    const url =configData.SERVER_URL+
      "/login.app?email=" +
      userEmail +
      "&password=" +
      userPassword;
    try {
      const response = await axios.post(url);
      alert("Welcome to Mail Mail Mail " + response.data.firstName + "!");
      setUser(response.data);
      sessionStorage.setItem("user", JSON.stringify(response.data));
      history.push("/home");
    } catch (error) {
      alert("LOGIN FAILED!");
    }
  }

  return sessionStorage.getItem("user") ? (
    <Redirect to="/home" />
  ) : (
    <>
      <Container className="fill border white width">
        <Row>
          <Col 
            className="mt-5 overflow-hidden"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img src={"/images/longTitle.svg"} width="1000"/>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Header as="h5" className="blue">
                Login
              </Card.Header>
              <Card.Body>
                <Form onSubmit={loginSubmit}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                    />
                  </Form.Group>
                  <Button className="blue" type="submit" block>
                    Login
                  </Button>
                </Form>
                <Container>
                  <Row>
                    <Col
                      className="m-5"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <ForgotPass/>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ display: "flex", justifyContent: "center" }}>
                      <Register />
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

import InputGroup from '../shared/Input/InputGroup';
import { FaLock, FaAt} from 'react-icons/fa';
import './Login.css';
import { Logo } from '../shared/Logo/Logo';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Separator from '../shared/Separator/Separator';
// import Button, { ButtonTypes} from '../shared/Button/Button';


function Login() {
    return(
        <div className="Login">
            <Container>
                <Row>
                    <Col>
                        <Logo className="logo"/>
                    </Col>
                </Row>
                <Row  className="mt-4">
                    <Col>
                        <h2>Sign in with</h2>
                    </Col>
                </Row>
                <Row  className="mt-1">
                    <Col className="flex-column">
                        <Button 
                            variant="secondary">
                                Sign in with Gmail
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="flex-column">
                        <Button 
                            variant="secondary">
                                Sign in with Facebook
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Separator>Or</Separator>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <div className="label_container">
                                <label for="input_email">Email Address</label>
                            </div>
                            <InputGroup>
                                <FaAt />
                                <input id="input_email" type="text"></input>
                            </InputGroup>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <div className="label_container">
                                <label for="input_password">Password</label>
                                <a href="/">Forgot Password?</a>
                            </div>
                            <InputGroup>
                                <FaLock />
                                <input id="input_password" type="password"></input>
                            </InputGroup>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col xs="8" className="d-flex">
                        <p className="align-self-center">Don't have an account? <a href="/">Sign up now</a></p>
                    </Col>
                    <Col xs="4" className="flex-column">
                        <Button type="submit">Sign In</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login;
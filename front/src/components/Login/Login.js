import InputGroup from '../shared/Input/InputGroup';
import { FaLock, FaAt} from 'react-icons/fa';
import './Login.css';
import { Logo } from '../shared/Logo/Logo';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Separator from '../shared/Separator/Separator';
import * as authService from '../../services/auth.service';
import { useState } from 'react';

const GitHubClientID = "Iv1.04f31e5892778339"
const GitHubOAuthRedirectUrl = "http://localhost:8080/auth/github/redirect"
const GmailClientID = "659858633917-1u99n59etga0f8g18455vlpg08g07unb.apps.googleusercontent.com"
const GmailOAuthRedirectUrl = "http://localhost:8080/auth/gmail/redirect"

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
        <div className="Login box">
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
                            href={`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${GmailOAuthRedirectUrl}&prompt=consent&response_type=code&client_id=${GmailClientID}&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&access_type=offline`}
                            variant="secondary">
                                Sign in with Gmail
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="flex-column">
                        <Button 
                            href={`https://github.com/login/oauth/authorize?client_id=${GitHubClientID}&redirect_uri=${GitHubOAuthRedirectUrl}`}
                            variant="secondary">
                                Sign in with GitHub
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
                                <label htmlFor="input_email">Email Address</label>
                            </div>
                            <InputGroup>
                                <FaAt />
                                <input id="input_email" type="text" value={email} onChange={ e => setEmail(e.target.value)}></input>
                            </InputGroup>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <div className="label_container">
                                <label htmlFor="input_password">Password</label>
                                <a href="/">Forgot Password?</a>
                            </div>
                            <InputGroup>
                                <FaLock />
                                <input id="input_password" type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                            </InputGroup>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col xs="8" className="d-flex">
                        <p className="align-self-center">Don't have an account? <a href="/">Sign up now</a></p>
                    </Col>
                    <Col xs="4" className="flex-column">
                        <Button type="submit" onClick={ _ => { signIn(email, password) } }>Sign In</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )

    function signIn(email, password) {
        authService.signin(email, password)
        .then(r => {
            props.onChange(true);
        });
    }
}


export default Login;
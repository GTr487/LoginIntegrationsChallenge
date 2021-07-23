import InputGroup from '../shared/Input/InputGroup';
import { FaLock, FaAt} from 'react-icons/fa';
import './Login.css';
import { Logo } from '../shared/Logo/Logo';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import Separator from '../shared/Separator/Separator';
import * as authService from '../../services/auth.service';
import { useEffect, useState } from 'react';

const GitHubOAuthRedirectUrl = "http://localhost:8080/auth/github/redirect"
const GmailOAuthRedirectUrl = "http://localhost:8080/auth/gmail/redirect"

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [authError, setAuthError] = useState("");

    const [githubClientID, setGithubClientID] = useState("");
    const [gmailClientID, setGmailClientID] = useState("");

    useEffect(() => {
        if(!githubClientID || !gmailClientID){
            authService.config().then(res => {
                if(res) {
                    setGithubClientID(res.gihub_client_id);
                    setGmailClientID(res.gmail_client_id);
                }
              });
        }
      })

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
                            href={`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${GmailOAuthRedirectUrl}&prompt=consent&response_type=code&client_id=${gmailClientID}&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&access_type=offline`}
                            variant="secondary">
                                Sign in with Gmail
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="flex-column">
                        <Button 
                            href={`https://github.com/login/oauth/authorize?client_id=${githubClientID}&redirect_uri=${GitHubOAuthRedirectUrl}`}
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
                                <input id="input_email" type="text" value={email} onChange={ e => { setEmail(e.target.value); setEmailError(false); }}></input>
                            </InputGroup>
                                <span className="imput_error">{emailError}</span>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <div>
                            <div className="label_container">
                                <label htmlFor="input_password">Password</label>
                                <a href="/">Forgot Password?</a>
                            </div>
                            <InputGroup>
                                <FaLock />
                                <input id="input_password" type="password" value={password} onChange={e => { setPassword(e.target.value); setPasswordError(false); }}></input>
                            </InputGroup>
                                <span className="imput_error">{passwordError}</span>
                        </div>
                    </Col>
                </Row>
                {   authError ? 
                        <Row className="mt-4">
                            <Col>
                                <Alert className="text-center" variant="danger">{ authError }</Alert>
                            </Col>
                        </Row>
                    : 
                        null
                }
                <Row className="mt-4">
                    <Col xs="8" className="d-flex">
                        <p className="align-self-center">Don't have an account? <a href="/">Sign up now</a></p>
                    </Col>
                    <Col xs="4" className="flex-column">
                        <Button type="submit" onClick={ _ => { signIn(email, password) }}>Sign In</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )

    function validateEmail(email) {
        if(!email) setEmailError("* Required");
        else if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) setEmailError("Invalid Format");
        else {
            setEmailError("");
            return true;
        }
        return false;
    }

    function validatePassword(email) {
        if(!email) setPasswordError("* Required");
        else {
            setPasswordError("");
            return true;
        }
        return false;
    }

    function signIn(email, password) {
        let validEmail = validateEmail(email);
        let validPassword = validatePassword(password);
        if(!validEmail || !validPassword) return;

        authService.signin(email, password)
        .then(r => {
            props.onChange(true);
        })
        .catch(err => {
            setAuthError("Authentication Failed");
        });
    }
}


export default Login;
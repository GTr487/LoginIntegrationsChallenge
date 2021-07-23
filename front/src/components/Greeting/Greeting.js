import { Button } from "react-bootstrap";
import * as authService from '../../services/auth.service';

function Greeting(props){
    return(
        <div className="box">
            <h1>Successful Login</h1>
            <Button className="mt-3" type="submit" onClick={ _ => { signOut() } }>Sign Out</Button>
        </div>
    );

    function signOut() {
        authService.signout()
        .finally(r => {
            props.onChange(false);
        });
    }
}


export default Greeting;
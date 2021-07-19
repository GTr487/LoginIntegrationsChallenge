import { render } from "@testing-library/react";
import Login from "./Login";

describe("Login", () => {
    it("successful render", () =>{
        render(<Login />)
    });
    
});
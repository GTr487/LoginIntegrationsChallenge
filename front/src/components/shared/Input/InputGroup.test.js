import { getByText, render } from "@testing-library/react";
import FancyInput from "./FancyInput";


describe('FancyInput', ()=> {
    
    it('successful render', ()=>{
        render(<FancyInput />);
    });
});
import React from 'react';
import './InputGroup.css';

function InputGroup(props) {
    return(
        <>
            {
                props.children ? 
                    <div className="InputGroup__input-box">
                        { props.children }
                    </div>
                    :
                    props.children
            }
        </>
    )
}


export default InputGroup;
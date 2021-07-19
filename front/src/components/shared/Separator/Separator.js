import './Separator.css';

function Separator(props) {
    return(
        <div className="Separator">
            <div className="Separator__line"></div>
            <p>{ props.children }</p>
            <div className="Separator__line"></div>
        </div>
    );
}

export default Separator;
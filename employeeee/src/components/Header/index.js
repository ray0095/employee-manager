import React from "react";

function Header(props) {
    return(
        <div className="jumbotron">
            <h1 className="display-4">Welcome to the Employee Manager</h1>
            <p className="lead">To start, please enter a search criteria below.</p>
            <hr className="my-4"/>
            <div>{props.children}</div>
        </div>
    )
}

export default Header;
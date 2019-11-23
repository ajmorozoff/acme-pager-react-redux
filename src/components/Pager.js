import React from 'react';
const { Component } = React;

class Pager extends Component {
    constructor(props) {
        super();
        this.state = {...props};
    }
    render() {
        return (
            <div id="page-control" className="page-control">
                Pager goes here
            </div>
        )
    }
}

export default Pager;

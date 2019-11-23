/* eslint-disable react/jsx-key */
import React from 'react';
const { Component } = React;
import {
    BrowserRouter,
    Link
  } from "react-router-dom";

class Pager extends Component {
    constructor(props) {
        super();
        this.state = {
            currentPage: props.currentPage,
            totalPages: props.totalPages,
        };
    }

    componentDidMount() {

    }

    render() {
        const { currentPage, totalPages } = this.state;
        let pagerButtons = [];
        for (let i = 0; i < totalPages; i++) {
            pagerButtons.push(i);
        }

        return (

            <div id="page-control" className="pager-container">
                <BrowserRouter>
                    <Link to={ currentPage ? `/${currentPage - 1}` : '/0'} className="pager-button">Previous</Link>
                {
                    pagerButtons.map(page => <Link to={`/${page}`} className={ page === currentPage ? 'page-button selected' : 'page-button selected'}>{page + 1}</Link>)
                }
                    <Link to={ currentPage + 1 === totalPages ? `/${currentPage - 1}` : `/${currentPage}`} className="pager-button">Previous</Link>
                </BrowserRouter>
            </div>
        )
    }
}

export default Pager;

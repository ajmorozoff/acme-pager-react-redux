/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-key */
import React from 'react';
const { Component } = React;
import { NavLink } from 'react-router-dom';
import { store } from '../redux/store';

class Pager extends Component {
    constructor(props) {
        super();
        this.state = {
            ...store.getState()
        };
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { currentPage } = this.state;
        const { totalPages } = this.props;
        let pagerButtons = [];
        for (let i = 0; i < totalPages; i++) {
            pagerButtons.push(i);
        }

        return (
            <div id="page-control" className="pager-container">
                    <NavLink to={ currentPage ? `/${currentPage - 1}` : '/0'} className="pager-button">Previous</NavLink>
                {
                    pagerButtons.map(page =>
                    <NavLink
                    to={`/${page}`}
                    className={ page === currentPage ? 'page-button selected' : 'page-button selected'}>
                        {page + 1}
                    </NavLink>)
                }
                    <NavLink to={ currentPage + 1 === totalPages ? `/${currentPage}` : `/${currentPage + 1}`} className="pager-button">Next</NavLink>
            </div>
        )
    }
}

export default Pager;

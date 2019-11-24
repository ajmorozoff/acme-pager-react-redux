/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-key */
import React from 'react';
const { Component } = React;
import { Link } from 'react-router-dom';
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
                    <Link
                    to={ currentPage ? `/${currentPage - 1}` : '/0'}
                    className="page-button"
                    disabled={currentPage ? "" : "disabled"}>
                        Previous
                    </Link>
                {
                    pagerButtons.map(page =>
                    <Link
                    to={`/${page}`}
                    className={ page === currentPage ? 'page-button selected' : 'page-button selected'}>
                        {page + 1}
                    </Link>)
                }
                    <Link
                    to={ currentPage + 1 === totalPages ? `/${currentPage}` : `/${currentPage + 1}`}
                    className="page-button"
                    disabled={currentPage + 1 === totalPages ? "disabled" : ""}>
                        Next
                    </Link>
            </div>
        )
    }
}

export default Pager;

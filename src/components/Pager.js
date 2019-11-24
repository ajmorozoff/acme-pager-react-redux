/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-key */
import React from 'react';
const { Component } = React;
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Pager extends Component {
    render() {
        const { currentPage, totalPages } = this.props;
        let pagerButtons = [];
        for (let i = 0; i < totalPages; i++) {
            pagerButtons.push(i);
        }

        return (
            <div id="page-control" className="pager-container">
                    <Link
                    to={ currentPage ? `/${currentPage - 1}` : '/0'}
                    className={currentPage ? "page-button" : "page-button-disabled"}>
                        Previous
                    </Link>
                {
                    pagerButtons.map(page =>
                    <NavLink
                    to={`/${page}`}
                    className={ page === currentPage ? 'page-button selected' : 'page-button selected'}
                    activeClassName="active">
                        {page + 1}
                    </NavLink>)
                }
                    <Link
                    to={ currentPage + 1 === totalPages ? `/${currentPage}` : `/${currentPage + 1}`}
                    className={currentPage + 1 === totalPages ? "page-button-disabled" : "page-button"}>
                        Next
                    </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { totalPages } = state;
    return { totalPages };
}

export default connect(mapStateToProps, null)(Pager);

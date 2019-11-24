import React from 'react';
import axios from 'axios';
import Table from './components/Table';
import Header from './components/Header';
import Pager from './components/Pager';
import { SET_EMPLOYEES, SET_TOTAL } from './redux/store';
import { connect } from 'react-redux';

const { Component } = React;
const columns = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    title: "Job Title",
}

class App extends Component {

    async fetchPageData(page) {
        return (await axios.get(`/api/employees/${page}`)).data;
    }

    async componentDidMount() {
        const page = this.props.match.params.page || 0;
        const init = (await axios.get(`/api/employees/0`)).data;
        const totalCount = Math.ceil( init.count / init.rows.length );
        this.props.setEmployees(page);
        this.props.setTotalPages(totalCount);
    }


    componentDidUpdate(prevProps) {
        let page = this.props.match.params.page;
        if (page !== prevProps.match.params.page) {
            if (page) {
                this.props.setEmployees(page);
            }
            else {
                this.props.setEmployees(0);
            }
        }
    }

    render() {
        const { employees } = this.props;
        if (!employees.length) {
            return (
                <div id="app">
                    Loading results...
                </div>
            )
        }
        return (
            <div id="app">
                <Header />
                <Table {...this.props} columns={columns} />
                <Pager currentPage={parseInt(this.props.match.params.page, 10)} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { employees } = state;
    return { employees };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setEmployees: async(page) => dispatch(
            {
                payload: {
                    employees: (await axios.get(`/api/employees/${page}`)).data.rows,
                },
                type: SET_EMPLOYEES
            }
        ),
        setTotalPages: (total) => dispatch(
            {
                payload: {
                    totalPages: total,
                },
                type: SET_TOTAL
            }
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

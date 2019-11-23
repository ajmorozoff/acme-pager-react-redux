import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Table from './components/Table';
import Header from './components/Header';
import Pager from './components/Pager';
import { store, updatePage } from './redux/store';

const { Component } = React;
const root = document.querySelector('#root');
const columns = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    title: "Job Title",
}


class App extends Component {
    constructor(props) {
        super();
        this.state = {
            employees: [],
            currentPage: 0,
            totalPages: 0,
        };
    }

    async fetchPageData() {
        const response = (await axios.get(`/api/employees/${this.state.currentPage}`)).data;
        const { count, rows } = response;
        this.setState({
            employees: rows,
            totalPages: Math.ceil(count / rows.length),
        });
    }

    componentDidMount () {
        this.fetchPageData();
    }

    render() {
        const { employees, currentPage, totalPages } = this.state;
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
                <Table employees={employees} columns={columns} />
                <Pager currentPage={currentPage} totalPages={totalPages} />
            </div>
        )
    }
}

ReactDOM.render(<App />, root);

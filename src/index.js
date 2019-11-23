import React from 'react';
import ReactDOM from 'react-dom';
import Redux from 'redux';
import axios from 'axios';
import Table from './components/Table';
import Header from './components/Header';
import Pager from './components/Pager';

const { Component } = React;
const root = document.querySelector('#root');

class App extends Component {
    constructor(props) {
        super();
        this.state = {
            users: [],
            currentPage: 0,
            totalPages: 0,
        };
    }

    async fetchPageData() {
        const response = (await axios.get(`/api/employees/${this.state.currentPage}`)).data;
        const { count, rows } = response;
        this.setState({
            users: rows,
            totalPages: Math.ceil(count / rows.length),
        });
    }

    componentDidMount () {
        this.fetchPageData();
    }

    render() {
        const { users, currentPage, totalPages } = this.state;
        if (!users.length) {
            return (
                <div id="app">
                    Loading results...
                </div>
            )
        }
        return (
            <div id="app">
                <Header />
                <Table users={users} verbose={false} />
                <Pager currentPage={currentPage} totalPages={totalPages} />
            </div>
        )
    }
}

ReactDOM.render(<App />, root);

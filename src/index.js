import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Table from './components/Table';
import Header from './components/Header';
import Pager from './components/Pager';
import { HashRouter, Route } from 'react-router-dom';
import { store, SET_EMPLOYEES, SET_PAGE } from './redux/store';

const { Component } = React;
const root = document.querySelector('#root');
const columns = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    title: "Job Title",
}


class App extends Component {
    constructor() {
        super();
        this.state =  {...store.getState(), totalPages: 0 };
    }

    async fetchPageData(page) {
        return (await axios.get(`/api/employees/${page}`)).data;
    }

    async componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));

        const {rows, count} = await this.fetchPageData(this.state.currentPage);
        store.dispatch({employees: rows, type: SET_EMPLOYEES});
        this.setState({totalPages: Math.ceil( count / rows.length)});
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    async componentDidUpdate(prevProps) {
        let curPage = this.props.match.params.page;
        if (curPage !== prevProps.match.params.page) {
            if (curPage) {
                store.dispatch({currentPage: curPage, type: SET_PAGE});
            }
            else {
                store.dispatch({currentPage: 0, type: SET_PAGE});
            }
            const { rows } = await this.fetchPageData(curPage || 0);
            store.dispatch({employees: rows, type: SET_EMPLOYEES});
        }
    }

    render() {
        const { employees, totalPages } = this.state;
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
                <Table columns={columns} />
                <Pager totalPages={totalPages} />
            </div>
        )
    }
}

const Root = () => (
      <HashRouter>
        <Route
            path="/:page?"
            component={App}
        />

      </HashRouter>
  )

ReactDOM.render(<Root />, root);

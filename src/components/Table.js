/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
const { Component } = React;
import { store } from '../redux/store';

class Table extends Component {
    constructor(props) {
        super();
        this.state = {...store.getState(), columns: props.columns }
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));

    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {

        const { columns, employees } = this.state;
        const dataFields = Object.keys(columns);
        const tableHeaders = Object.values(columns);
        return (
            <div id="table-container" className="table-container">
                <thead>
                    <tr className="table-header">
                        {
                            tableHeaders.map((col, idx) => <th key={idx}>{col}</th>)
                        }
                    </tr>
                </thead>
                <tbody className="table-body">
                    {
                        employees.map(emp =>
                            <tr key={emp.id}>
                                {
                                    Object.keys(emp).map(key => {
                                        if (dataFields.includes(key))
                                        {
                                            return <td>{emp[key]}</td>
                                        }
                                    })
                                }
                            </tr>)
                    }
                </tbody>
            </div>
        )
    }
}

export default Table;

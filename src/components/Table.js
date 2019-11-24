/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
const { Component } = React;
import { connect } from 'react-redux';
import axios from 'axios';
import { SET_EMPLOYEES } from '../redux/store';

class Table extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(id) {
        const page = this.props.match.params.page || 0;
        await axios.delete(`/api/employees/${id}`);
        this.props.setEmployees(page);
    }


    render() {
        const { columns, employees } = this.props;
        const dataFields = Object.keys(columns);
        const tableHeaders = Object.values(columns);
        return (
            <div id="table-container">
                <table>
                    <thead>
                        <tr>
                            {
                                tableHeaders.map((col, idx) => <th key={idx}>{col}</th>)
                            }
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
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
                                    <td>
                                        <button onClick={() => this.handleClick(emp.id)}>Delete</button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
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
    }
}

export default connect(mapStateToProps, null)(Table);

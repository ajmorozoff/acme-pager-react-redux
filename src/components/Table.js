
import React from 'react';
const { Component } = React;
const verbose = [
    'id',
    'createdAt',
    'updatedAt'
];

class Table extends Component {
    constructor(props) {
        super();
        this.state = {
            users: props.users,
            verbose: props.verbose,
            columns: [],
        }
    }

    componentDidMount() {
        const tmp = this.state.users[0];
        const columns = (this.state.verbose ? Object.keys(tmp) : Object.keys(tmp).filter(key => !verbose.includes(key)));
        this.setState({ columns });
    }

    render() {
        const { columns, users } = this.state;
        return (
            <div id="table-container" className="table-container">
                <thead>
                    <tr className="table-header">
                        {
                            columns.map(col => <th> {col} </th>)
                        }
                    </tr>
                </thead>
                <tbody className="table-body">
                </tbody>
            </div>
        )
    }
}

export default Table;

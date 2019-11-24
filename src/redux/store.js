import { createStore } from 'redux';

const SET_PAGE = 'SET_PAGE';
const SET_EMPLOYEES = 'SET_EMPLOYEES';
const SET_TOTAL = 'SET_TOTAL';

const initState = {
    employees: [],
    currentPage: 0,
    totalPages: 0
}

const employeeReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_EMPLOYEES:
            return {...state, employees: action.payload.employees};
        case SET_TOTAL:
            return {...state, totalPages: action.payload.totalPages};
        default:
            return state;
    }
}

const store = createStore(employeeReducer);

export {
    store,
    SET_EMPLOYEES,
    SET_PAGE,
    SET_TOTAL,
}

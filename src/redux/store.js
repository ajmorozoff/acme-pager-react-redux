import { createStore } from 'redux';

const SET_PAGE = 'SET_PAGE';
const SET_EMPLOYEES = 'SET_EMPLOYEES';


const initState = {
    employees: [],
    currentPage: 0,
}

const setEmployees = (employees) =>  {
    return {
        type: SET_EMPLOYEES,
        employees,
    }
}

const updatePage = (currentPage) => {
    return {
        type: SET_PAGE,
        currentPage,
    }
}

const employeeReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_PAGE:
            return {...state, currentPage: parseInt(action.currentPage, 10)};
        case SET_EMPLOYEES:
            return {...state, employees: action.employees};
        default:
            return state;
    }
}

const store = createStore(employeeReducer);

export {
    store,
    updatePage,
    setEmployees,
    SET_EMPLOYEES,
    SET_PAGE
}

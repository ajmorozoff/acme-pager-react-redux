import { createStore } from 'redux';
import axios from 'axios';

const UPDATE_PAGE = 'UPDATE_PAGE';

const initState = {
    employees: [],
    currentPage: 0,
}

const updatePage = (newPage) => {
    return {
        type: UPDATE_PAGE,
        newPage,
    }
}

const employeeReducer = async(state = initState, action) => {
    if (action.type === UPDATE_PAGE) {
        const response = (await axios.get(`/api/employees/${action.newPage}`)).data;
        return {...state, currentPage: action.newPage, employees: response};
    }
    return state;
}

const store = createStore(employeeReducer);

export {
    store,
    updatePage
}

import axios from 'axios';

const API_URL = 'https://dummyjson.com';
const USERS_URL = `${API_URL}/users`;
const FILTER_URL = `${USERS_URL}/filter`;

const fetchData = async (dispatch, url, successType, errorType, errorMessage, queryParams = {}) => {

    let finalUrl = new URL(url).href;
    if (Object.keys(queryParams).length > 0) {
        const params = new URLSearchParams(queryParams);
        finalUrl += `?${params.toString()}`;
    }

    try {
        const response = await axios.get(finalUrl);
        const data = response.data;
        dispatch({type: successType, payload: data});
    } catch (error) {
        console.error(error);
        dispatch({type: errorType, error: errorMessage});
    }
};

export const fetchUsers = (queryParams = {}) => {
    return async (dispatch) => {
        const successType = 'FETCH_USERS_SUCCESS';
        const errorType = 'FETCH_USERS_ERROR';
        const errorMessage = 'Failed to fetch users';
        await fetchData(dispatch, USERS_URL, successType, errorType, errorMessage, queryParams);
    };
};

export const fetchFilteredUsers = (queryParams = {}) => {
    return async (dispatch) => {
        const successType = 'FETCH_USERS_SUCCESS';
        const errorType = 'FETCH_USERS_ERROR';
        const errorMessage = 'Failed to fetch users';
        await fetchData(dispatch, FILTER_URL, successType, errorType, errorMessage, queryParams);
    };
};

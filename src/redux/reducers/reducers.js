const initialState = {
    users: {
        limit: 0,
        skip: 0,
        total: 0,
        users: []
    },
    error: null,
};

export const createFetchSuccessReducer = (fieldName) => {
    return (state, action) => {
        return { ...state, [fieldName]: action.payload, error: null };
    };
};

export const createFetchErrorReducer = (fieldName) => {
    return (state, action) => {
        return { ...state, [fieldName]: [], error: action.payload };
    };
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USERS_SUCCESS':
            return createFetchSuccessReducer('users')(state, action);
        case 'FETCH_USERS_ERROR':
            return createFetchErrorReducer('users')(state, action);
        default:
            return state;
    }
};

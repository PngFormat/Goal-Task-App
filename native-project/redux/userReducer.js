const initialState = {
    username: '',
    savings: [],
    email: null,
    salary: 0,
    user: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                username: action.payload.username || '',
                savings: action.payload.savings || [],
                salary: action.payload.salary || 0,
                email: action.payload.email || null,
            };
        case 'LOGOUT_USER':
            return initialState;
        default:
            return state;
    }
};

export default userReducer;

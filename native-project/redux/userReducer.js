const initialState = {
    username: '',
    savings: 0,
    email: '' || null,
    salary: 0,
}

const userReducer = (state = initialState,action) => {
    switch (action.type) {
        case 'SET_USER': 
        return {
            ...state,
            username: action.payload.username,
            user: action.payload,
            savings:action.payload.savings,
            salary: action.payload.salary,
            email: action.payload.email,
        }
        case 'UPDATE_SAVINGS':
            return {
              ...state,
              savings: action.payload,
            };
          default:
            return state;
        }
        
        
      };
      
export default userReducer;

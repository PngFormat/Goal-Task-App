import { ADD_GOAL, REMOVE_GOAL } from "../actions";

const initialState = {
    goals: [],
    id: 1,
};

const goalsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_GOAL:
            console.log('Current goals state:', state.goals);
            console.log('Adding new goal:', action.payload);
            if (Array.isArray(state.goals)) {
                return {
                    goals: [...state.goals, { ...action.payload, id: state.id }],
                    id: state.id + 1,
                };
            } else {
                console.error('Error: Goals is not an array:', state.goals);
                return state;
            }
        case REMOVE_GOAL:
            return {
                ...state,
                goals: state.goals.filter((_, index) => index !== action.payload),
                id: state.id - 1,
            };
    
        default:
            return state;
    }
};

export default goalsReducer;

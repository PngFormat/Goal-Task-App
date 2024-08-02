export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';
export const SET_USER = 'SET_USER'
export const UPDATE_SAVINGS = 'UPDATE_SAVINGS'
export const UPDATE_SALARY = 'UPDATE_SALARY'


export const add_goal = (goal) => ({
    type: ADD_GOAL,
    payload: goal
});

export const remove_goal = (index) => ({
    type: REMOVE_GOAL,
    payload: index
});

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,

});

export const setSavings = (savings) => ({
    type: UPDATE_SAVINGS,
    payload: savings,

})
export const setSalary = (salary) => ({
    type: UPDATE_SALARY,
    payload: salary,

})
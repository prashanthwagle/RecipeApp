export const GET_ERRORS = "GET_ERRORS";
export const USER_LOADING = "USER_LOADING";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

//To get all RECIPES
export const GET_RECIPES = "GET_RECIPES";
//To update the created RECIPE in the state
export const CREATE_RECIPE = "CREATE_RECIPE"
//To get the RECIPES via axios and set the state
export const GET_RECIPE = "GET_RECIPE"
//To axios patch and change the state 
export const UPDATE_RECIPE = "UPDATE_RECIPE"
//To Delete the RECIPE
export const DELETE_RECIPE = "DELETE_RECIPE"

//Update and Delete are like update/delete in database
//via axios and update/delete in state
//by dispatching an action of type UPDATE/DELETE
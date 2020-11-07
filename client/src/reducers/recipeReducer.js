import {
    CREATE_RECIPE,
    GET_RECIPE,
    GET_RECIPES,
    UPDATE_RECIPE,
    DELETE_RECIPE
} from '../actions/types'

const initState = {
    recipe: {},
    recipes: [],
}

export default function(state=initState, action){
    switch(action.type){
        case CREATE_RECIPE:
            return{
                ...state,
                recipes:[...state.recipe, action.payload]
            }
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                recipe:[]
            }
        //Get the recipe and update the state so that recipe can be read from state
        case GET_RECIPE:
            console.log(JSON.stringify(action.payload, null, 4))
            return{
                ...state,
                recipe: {...action.payload}
            }
        case UPDATE_RECIPE:
            const recipes = state.recipes.filter(recipe=>recipe._id!==action.payload._id)
            //Replace old recipe with newer version
            return{
                ...state,
                recipe:{},
                recipes: [...recipes, action.payload]
            }
        case DELETE_RECIPE:
            return{
                ...state,
                recipe:{},
                recipes:state.recipes.filter(recipe=>recipe._id!==action.id)

            }
        default:
            return state;
    }
}
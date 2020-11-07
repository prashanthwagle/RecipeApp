import axios from 'axios';
import {
    GET_RECIPE,
    GET_RECIPES,
    UPDATE_RECIPE,
    DELETE_RECIPE,
    CREATE_RECIPE
} from './types'


export const createNewRecipe = (recipeData, history, uploadFiles) => dispatch => {

    let awsPromise = new Promise((resolve,reject)=>{
        const formData = new FormData();
        for(let i=0;i<uploadFiles.length;i++){
            formData.append(`recipe`, uploadFiles[i]);
        }

        const config = {
            headers:{
                "Content-Type": 'multipart/form-data'
            }
        }


        axios.post("/api/aws", formData, config)
            .then(res=>{
                resolve(res.data)
            })
            .catch(e=>{reject("Alert in AWS API")})

    }).then((imageURLs)=>{
        recipeData.images=imageURLs.imageArray;
            axios.post('/api/recipes/create', recipeData)
                    .then(res=>{
                        dispatch({
                            type: CREATE_RECIPE,
                            payload: res.data
                        })
                    }
                    )
                    .catch(err=>{
                        alert("Error creating a new Recipe")
                    });
                    history.push("/dashboard");
        })
        .catch(e=>{
            alert(e)
        })
}

export const getRecipeList = ()=>dispatch=>{
    axios.get('/api/recipes')
            .then(res=>{
                dispatch({
                    type: GET_RECIPES,  
                    payload: res.data
                })
            })
            .catch(err=>{
                alert("Error getting recipeList")
            })
}

export const getRecipeById = (id, history) => dispatch =>{
    axios.get(`/api/recipes/${id}`)
            .then(res=>{
                dispatch({
                    type: GET_RECIPE,
                    payload: res.data
                })
            })
            .catch(e=>{
                alert(e);
                if(history)
                    history.push("/dashboard")
            })
}

export const deleteRecipe = (id,history)=> dispatch =>{
    axios.delete(`/api/recipes/${id}`)
            .then(res=>{
                dispatch({
                    type: DELETE_RECIPE,
                    payload:id
                })
                alert("Delete Successful")
                history.push("/dashboard/mine");

            })
            .catch(e=>{
                alert(e);
                history.push("/dashboard/mine");
            })
        
}

export const updateRecipe = (recipeData, history)=>dispatch=>{
    const id = recipeData.id;
    axios.put(`/api/recipes/${id}`, recipeData)
            .then(res=>{
                dispatch({
                    type: UPDATE_RECIPE,
                    payload: id
                })
                alert("Update Successful");
                history.push("/dashboard/mine");
            })
            .catch(e=>{
                alert(e);
                history.push("/dashboard/mine");
            })
}




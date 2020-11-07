import React, {useState, useEffect, useMemo} from 'react'
import { connect } from 'react-redux'
import {createNewRecipe, getRecipeById, updateRecipe} from '../../actions/recipeActions';
import  Dropzone, {useDropzone}from 'react-dropzone'



function CreateRecipe(props) {
    //First I'll send everything as strings (with an image string)
    //tadiis title author desc instr images steps


    useEffect(()=>{
        props.getRecipeById(props.match.params.id);
    },[])

    useEffect(()=>{
        if(props.match.path === "/dashboard/:id/update"){
            
            setTitle(props.currentRecipe.title);
            setDesc(props.currentRecipe.description);
            setSteps(props.currentRecipe.steps);
            setIngredients(props.currentRecipe.ingredients);
        }

    },[props.currentRecipe])
    
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [images, setImages] = useState('');
    const [steps, setSteps] = useState('');
    const [ingredients, setIngredients]= useState('')
    const [uploadFiles, setUploadFiles] = useState(new Array());

    const onChange = (e)=>{
        const {id, value} = e.target;
        switch(id){
            case "title": setTitle(value);
                            break;
            case "desc": setDesc(value);
                            break;
            case "images": setImages(value);
                            break;
            case "steps": setSteps(value);
                            break;
            case "ingredients": setIngredients(value);
                            break;
        }
    }

    const submit = (e)=>{
        e.preventDefault();
        //send images to backend and get the urls

        if(props.match.path !== "/dashboard/:id/update"){
            //Create New Recipe
            props.createNewRecipe({
                title: title,
                author: props.name,
                description: desc,
                ingredients: ingredients,
                steps: steps
            }
                ,props.history
                ,uploadFiles)

        }

        else{
            //Update Existing Recipe
            props.updateRecipe({
                title: title,
                author: props.name,
                description: desc,
                ingredients: ingredients,
                steps: steps,
                id: props.currentRecipe._id
            }
                ,props.history)
        }

        
    
    }


    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        setUploadFiles([...uploadFiles, file]);
    }

    return (
        <div className="container" style={{marginTop: "5em"}}>
            <form onSubmit={submit}>
                <div className="row">
                    <div className="input-field col s12">
                        <input type="text" 
                        id="title"
                        class="validate"
                        onChange={onChange}
                        value={title}
                        />
                        <label class="active" for="title">Title</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input type="text" 
                        id="desc"
                        class="validate"
                        onChange={onChange}
                        value={desc}
                        />
                        <label for="desc">Description</label>
                    </div>
                </div>
    
                <div className="row">
                    <div className="input-field col s12">
                        <input type="text" 
                        id="ingredients"
                        class="validate"
                        onChange={onChange}
                        value={ingredients}
                        />
                        <label for="ingredients">Ingredients</label>
                    </div>
                </div>
    
                <div className="row">
                    <div className="input-field col s12">
                        <input type="text" 
                        id="steps"
                        class="validate"
                        onChange={onChange}
                        value={steps}
                        />
                        <label for="steps">Steps</label>
                    </div>
                </div>

                
            {    props.match.path !== "/dashboard/:id/update"?
                <div className="row">
                    <div className="input-field col s12">
                        <input type="file" accept="image/*" name="recipe" onChange={handleFileChange}/>
                    </div>    
                </div>
                :
                <div/>
            }

                <input type="submit" className="btn blue waves-effect waves-light" style={{marginBottom: "2rem"}}/>
            </form>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        name: state.auth.user.name,
        currentRecipe: state.recipe.recipe
    }
}

export default connect(mapStateToProps, { createNewRecipe, getRecipeById, updateRecipe })(CreateRecipe);

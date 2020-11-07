import React, {useEffect} from 'react'
import {getRecipeById} from '../../actions/recipeActions';
import {connect} from 'react-redux';
import Gallery from 'react-grid-gallery';
import ImageGallery from 'react-image-gallery';
import {deleteRecipe} from '../../actions/recipeActions'
import './index.css'




function RecipeDetail(props) {

    let displayImages = [];

    useEffect(()=>{
        props.getRecipeById(props.match.params.id, props.history);
    },[])

    useEffect(()=>{
        const imagesParams = {
            src: '',
            thumbnail:''
        }
        if(Object.entries(props.currentRecipe).length !== 0){
            props.currentRecipe.images.forEach(image=>{
                imagesParams.thumbnailHeight=400;
                imagesParams.thumbnailHeight=600;
                imagesParams.src=image;
                imagesParams.thumbnail=image;
                displayImages.push(imagesParams);
            })
        }


    },[props.currentRecipe.images])

    const handleDelete = ()=>{
        props.deleteRecipe(props.currentRecipe._id, props.history)
    }

    const handleUpdate = ()=>{
        props.history.push(`/dashboard/${props.currentRecipe._id}/update`)
    }

    const buttons = (
        <div className="row recipeSection">
            <div className="col s6 ">
                <button className="red btn waves-effect waves-light"  onClick={handleDelete}>Delete</button>
            </div>

            <div className="col s6 ">
                <button className="cyan btn waves-effect waves-light"  onClick={handleUpdate}>Update</button>
            </div>
            
        </div>
        
    )
    

    return (
        <div className="container">
            <div className="recipeSection" >
                <h1 style={{fontFamily:"monospace"}}>{props.currentRecipe.title}</h1>
                <p>Author: <i>{props.currentRecipe.author}</i></p>
            </div>

            <div className="recipeSection" >
                <h5><b>Images</b></h5>
                <div className="recipeContent" style={{display:"grid", width:"100%", justifyItems:"center"}}> 
                    {props.currentRecipe.images?
                    props.currentRecipe.images.map(image=>{
                        return (<img src={image} className="recipeSection" style={{maxWidth:"70vw"}}/>)
                    }):
                    <div/>
                    }
                </div>
            </div>

            {/* { <Gallery images={displayImages} backdropClosesModal={true} className="recipeSection" style={{width: "50vw"}}/> } */}

            <div className="description recipeSection"> 
                <h5><b>Description</b></h5>
                <p className="recipeContent">{props.currentRecipe.description}</p>
            </div>

            <div className="recipeSection"> 
                <h5><b>Ingredients</b></h5>
                <p className="recipeContent">{props.currentRecipe.ingredients}</p>
            </div>
            
            <div className="recipeSection" >
                <h5><b>Steps</b></h5>
                <p className="recipeContent">{props.currentRecipe.steps}</p>
            </div>


        
            {/* { <ImageGallery items={displayImages}/>} */}

            
            {
                props.author===props.currentRecipe.author?
                (buttons)
                :
                <div/>
            }


        </div>
    )
}

const mapStateToProps  = ({recipe, auth})=>{
    return{
        currentRecipe: recipe.recipe,
        author: auth.user.name
        
    }
}


export default connect(mapStateToProps, {getRecipeById, deleteRecipe})(RecipeDetail);

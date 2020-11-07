import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux';
import Card from '../layout/Card'
import {getRecipeList} from '../../actions/recipeActions' 
import {Link} from 'react-router-dom'


    function Dashboard(props) {
        useEffect(()=>{
            props.getRecipeList()
        },[])

        const [search, setSearch] = useState('');

        const handleSearch=(e)=>{
            setSearch(e.target.value)
        }

    return (
        <div className="container">
            <nav>
                <div class="nav-wrapper static">
                <form>
                    <div class="input-field cyan">
                        <input id="search" type="search" onChange = { handleSearch} required/>
                        <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                        <i class="material-icons">close</i>
                    </div>
                </form>
                </div>
            </nav>


            <p>Welcome to the App,<b>{props.name}</b></p>
            <div style={{justifyContent:"center"}}>
            {
                props.match.path!=="/dashboard/mine"?
                props.recipeList.map(recipe=>{
                        if(search===""){
                            return ( <Link key={recipe._id} to = {`/dashboard/${recipe._id}`}> <Card title={recipe.title} mine="false"  author={recipe.author} description={recipe.description}/></Link> )
                        }
                        else{
                            if(recipe.title.toLowerCase().indexOf(search.toLowerCase())>=0 || recipe.ingredients.toLowerCase().indexOf(search.toLowerCase())>=0)
                                return ( <Link key={recipe._id} to = {`/dashboard/${recipe._id}`}> <Card title={recipe.title} mine="false"  author={recipe.author} description={recipe.description}/></Link> )
                            return <div/>
                        }
                        }
                    )
        

                :

                props.recipeList.map(recipe=>{
                    if(recipe.author===props.name){
                        if(search ===""){                        
                            return ( <Link key={recipe._id} to = {`/dashboard/${recipe._id}`}> <Card title={recipe.title} mine="true" description={recipe.description}/></Link> )
                        }
                    
                        else{
                            if(recipe.title.toLowerCase().indexOf(search.toLowerCase())>=0 || recipe.ingredients.toLowerCase().indexOf(search.toLowerCase())>=0)
                                return ( <Link key={recipe._id} to = {`/dashboard/${recipe._id}`}> <Card title={recipe.title} mine="true"  author={recipe.author} description={recipe.description}/></Link> )
                            return <div/>
                        }
                    }
                        
                })

                
            
            }
                {/* {props.recipeList.map(recipe=>{
                    return ( <Link to = {`/dashboard/${recipe._id}`}> <Card title={recipe.title} author={recipe.author} description={recipe.description}/></Link> )
                })} */}

                <h5>Thats all it!</h5>
            </div>
        </div>
    )
}


const mapStateToProps = ({auth, recipe})=>{
    return{
        name: auth.user.name,
        recipeList: recipe.recipes
    }
}
export default connect(mapStateToProps, {getRecipeList})(Dashboard)

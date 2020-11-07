import React from 'react'

function Card(props) {
    return (
        <div className="row">
            <div className="col s12 m12">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                    <span className="card-title">{props.title}</span>
                    <p>{props.description}</p>
                    </div>
                    <div className="card-action">
                    {    
                    props.mine=="true"?
                    <b>Click to View/Edit/Delete</b>
                    :
                    <b>{props.author}</b>
                    }
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Card;

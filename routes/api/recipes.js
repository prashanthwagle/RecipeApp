const express = require("express");
const router = express.Router();

const Recipe = require('../../models/Recipe');

const deleteAWS  = require('./aws').deleteAWS;


router.get('/test', (req,res)=>{
    res.send("Recipe Route Checked!")
})

router.get("/", (req,res)=>{
    Recipe.find()
            .then(recipes=>res.json(recipes))
            .catch(err=>res.status(404).json({message: 'Error in finding recipes'}));
})

router.post("/create", (req,res)=>{
    const newRecipe = new Recipe(req.body);
    console.log("At New Recipe "+req.body)
    newRecipe.save()
                .then(doc=>res.json(doc))
                .catch(err=>res.status(400).json(err));
});

router.get("/:id", (req,res)=>{
    Recipe.findById(req.params.id)
            .then(book=>res.json(book))
            .catch(err=> res.status(400).json({message: "Recipe not found"}));
});

router.put('/:id', (req,res)=>{
    Recipe.findByIdAndUpdate(req.body.id, req.body)
            .then(book => res.json({message: "Updated Successfully"}))
            .catch(err=>res.status(400).json({message:"Unable to update book"}))
});


router.delete('/:id', (req,res)=>{
    Recipe.findByIdAndRemove(req.params.id, req.body)
            .then(recipe => {
                    let promiseArray=[];
                    recipe.images.forEach(image=>{
                        promiseArray.push(deleteAWS(image));
                    })

                    Promise.all(promiseArray)
                            .then(r=>{
                                res.status(200).json({message: "Delete Success"})
                            })
                            .catch(err=>{
                                res.status(400).json({message: JSON.stringify(err)})
                            })
            })
            .catch(err=> res.status(400).json({message: "Unable to delete recipe "+err}));
    
})


module.exports = router;
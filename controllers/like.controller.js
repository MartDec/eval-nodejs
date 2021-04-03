/* 
Imports
*/
    const Models = require('../models/index');
//

/*  
CRUD methods
*/
    const createOne = req => {
        return new Promise( (resolve, reject) => {
            Models.like.create( req.body )
                .then(async data => {
                    const type = req.body.post === null ? 'comment' : 'post'
                    const id = req.body[type]
                    const parent = await Models[type].findById(id)
                    parent.likes.push(data._id)
                    await parent.save()

                    Models.like.findById(data._id)
                        .populate('author', [ '-password' ])
                        .exec((err, like) => resolve(like))
                })
                .catch( err => reject(err) )
        })
    }
 
    const readAll = () => {
        return new Promise( (resolve, reject) => {
            // Mongoose population to get associated data
            Models.like.find()
                .populate('author', [ '-password' ])
                .exec( (err, data) => {
                    if( err ){ return reject(err) }
                    else{ return resolve(data) }
                })
        })
    }

    const readOne = id => {
        return new Promise( (resolve, reject) => {
            Models.like.findById( id )
                .populate('author', [ '-password' ])
                .exec( (err, data) => {
                    if( err ){ return reject(err) }
                    else{ return resolve(data) }
                })
        })
    }

    const updateOne = req => {
        return new Promise( (resolve, reject) => {
            Models.like.findById( req.params.id )
            .then( post => {
                post.headline = req.body.headline;
                post.body = req.body.body;
                post.dateModified = new Date();

                post.save()
                    .then( updatedPost => resolve(updatedPost) )
                    .catch( updateError => reject(updateError) )
            })
            .catch( err => reject(err) )
        })
    }

    const deleteOne = req => {
        return new Promise( (resolve, reject) => {
             Models.like.findByIdAndDelete( req.params.id, (err, deleted) => {
                if (err) { return reject(err) }
                else { return resolve(deleted) }
            })
        });
    }
//

/* 
Export controller methods
*/
    module.exports = {
        readAll,
        readOne,
        createOne,
        updateOne,
        deleteOne
    }
//
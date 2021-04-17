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
            Models.post.create( req.body )
            .then( data => resolve(data) )
            .catch( err => reject(err) )
        })
    }

    const readAll = () => {
        return new Promise( (resolve, reject) => {
            Models.post.find()
                .populate('author', [ '-password' ])
                .populate('likes')
                .populate({
                    path: 'comments',
                    populate: { path: 'author' }
                })
                .exec( (err, data) => {
                    if( err ){ return reject(err) }
                    else{ return resolve(data) }
                })
        })
    }

    const readLatest = () => {
        return new Promise((resolve, reject) => {
            Models.post.find()
                .populate('author', [ '-password' ])
                .populate('likes')
                .populate({
                    path: 'comments',
                    populate: { path: 'author' }
                })
                .limit(6)
                .exec( (err, data) => {
                    if( err ){ return reject(err) }
                    else{ return resolve(data) }
                })
        })
    }

    const readOne = id => {
        return new Promise( (resolve, reject) => {
            // Mongoose population to get associated data
            Models.post.findById( id )
                .populate('author', [ '-password' ])
                .populate('likes')
                .populate({
                    path: 'comments',
                    populate: { path: 'author' }
                })
                .populate({
                    path: 'comments',
                    populate: { path: 'likes' }
                })
                .exec( (err, data) => {
                    if( err ){ return reject(err) }
                    else{ return resolve(data) }
                })
        })
    }

    const updateOne = req => {
        return new Promise( (resolve, reject) => {
            Models.post.findById( req.params.id )
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
             Models.post.findByIdAndDelete( req.params.id, (err, deleted) => {
                if( err ){ return reject(err) }
                else{ return resolve(deleted) };
            })
        });
    }
//

/*
Export controller methods
*/
    module.exports = {
        readAll,
        readLatest,
        readOne,
        createOne,
        updateOne,
        deleteOne
    }
//

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
            Models.comment.create( req.body )
                .then(async data => {
                    const post = await Models.post.findById(data.post)
                    post.comments.push(data._id)
                    await post.save()
                    Models.comment.findById(data._id)
                        .populate('author', ['-password'])
                        .exec((err, comment) => {
                            resolve(comment)
                        })
                })
                .catch(err => reject(err))
        })
    }
 
    const readAll = () => {
        return new Promise((resolve, reject) => {
            Models.comment.find()
                .populate('author', [ '-password' ])
                .populate('likes')
                .exec( (err, data) => {
                    if (err) { return reject(err) }
                    else { return resolve(data) }
                })
        })
    }

    const readOne = id => {
        return new Promise( (resolve, reject) => {
            Models.comment.findById( id )
                .populate('author', [ '-password' ])
                .populate('likes')
                .exec( (err, data) => {
                    if( err ){ return reject(err) }
                    else{ return resolve(data) }
                })
        })
    }

    const updateOne = req => {
        return new Promise(async (resolve, reject) => {
            const comment = await Models.comment.findById(req.params.id)
            if (comment.author.toString() === req.user._id.toString()) {
                comment.headline = req.body.headline;
                comment.body = req.body.body;
                comment.dateModified = new Date();

                return comment.save()
                    .then(updatedPost => resolve(updatedPost))
                    .catch(updateError => reject(updateError))
            }

            reject(new Error('You cant update this comment'))
        })
    }

    const deleteOne = req => {
        return new Promise( async (resolve, reject) => {
            const comment = await Models.comment.findById(req.params.id)
            if (comment.author.toString() === req.user._id.toString()) {
                return Models.comment.findByIdAndDelete( req.params.id, (err, deleted) => {
                    if (err) { return reject(err) }
                    else { return resolve(deleted) }
                })
            }

            reject(new Error('You cant delete this comment'))
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
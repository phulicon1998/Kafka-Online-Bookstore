const db = require("../models");
const {gatherDataById} = require("../manipulate");
const {cloudinary} = require("../utils/uploader");

exports.get = async(req, res, next) => {
    try {
        let editions = await db.Edition.find().populate("book_id").populate("provider_id").exec();
        return res.status(200).json(editions);
    } catch(err) {
        return next(err);
    }
}

exports.getInCart = async(req, res, next) => {
    try {
        // get the list id and retrieve the data by id
        let listId = req.body.list.map(v => v.edition_id);
        let editions = await db.Edition.find({_id: {$in: listId}}).populate("book_id").lean().exec();

        // retrieves all the authors
        let authors = await db.BookAuthor.find().populate("author_id").exec();
        editions.forEach(e => {
            e.authors = gatherDataById(e.book_id._id, "author_id", authors);
        });

        return res.status(200).json(editions);
    } catch (e) {
        return next(e);
    }
}

exports.getOne = async(req, res, next) => {
    try {
        const {edition_id} = req.params;
        let foundEdition = await db.Edition.findById(edition_id).populate({
            path: "review_id",
            populate: {
                path: "user_id"
            }
        }).populate({
            path: "book_id",
            populate: {
                path: "publish.by"
            }
        }).lean().exec();

        // get the author and genre for the edition
        let authors = await db.BookAuthor.find().populate("author_id").lean().exec();
        let genres = await db.BookGenre.find().populate("genre_id").lean().exec();
        foundEdition.authors = gatherDataById(foundEdition.book_id._id, "author_id", authors);
        foundEdition.genres = gatherDataById(foundEdition.book_id._id, "genre_id", genres);

        return res.status(200).json(foundEdition);
    } catch (e) {
        return next(e);
    }
}

exports.create = async(req, res, next) => {
    try {
        const {uploadImgs, book_id} = req.body;
        let createdEdition = await db.Edition.create({...req.body, images: uploadImgs});

        // Find the subject book for pushing the created edition id
        let foundBook = await db.Book.findById(book_id);
        if(foundBook) {
            foundBook.edition_id.push(createdEdition._id);
            await foundBook.save();
        }

        return res.status(200).json(createdEdition);
    } catch(err) {
        return next(err);
    }
}

exports.stop = async(req, res, next) => {
    try {
        let foundEdition = await db.Edition.findById(req.params.edition_id);
        if(foundEdition) {
            foundEdition.outOfBusiness = !foundEdition.outOfBusiness;
            await foundEdition.save();
        }
        return res.status(200).json(foundEdition);
    } catch (e) {
        return next(e);
    }
}

exports.edit = async(req, res, next) => {
    try {
        // Get text data from the request
        const {edition_id} = req.params;
        let {currentImgs, uploadImgs, ...edition} = req.body;
        currentImgs = currentImgs ? Array.from(currentImgs).map(img => JSON.parse(img)) : [];

        // Retrieve current stored edition
        let foundEdition = await db.Edition.findById(edition_id);
        let storedImgs = foundEdition.images;

        // Remove all those images no longer in use
        let currentImgsIsReduced = currentImgs.length < foundEdition.images.length;
        if(currentImgsIsReduced) {

            // Determine the images no longer in use
            let currentImgsId = currentImgs.map(img => img.uid);
            let removeImgs = foundEdition.images.filter(img => currentImgsId.indexOf(img.cloud_id) === -1);

            // If there are any image no longer in use, remove them
            for(let img of removeImgs) {
                cloudinary.v2.uploader.destroy(img.cloud_id);
            }

            // Get stored images still in use
            storedImgs = storedImgs.filter(img => currentImgsId.indexOf(img.cloud_id) !== -1);
        }

        // Assign the new images list of the edition
        let images = uploadImgs ? [...storedImgs, ...uploadImgs] : storedImgs;
        edition = {...edition, images};

        // Update the text data of the edition
        await db.Edition.findByIdAndUpdate(edition_id, edition, {new: true});

        // Retrieve updated data to render on client
        let editedEdition = await db.Edition.findById(edition_id).populate("book_id").populate("provider_id").exec();
        return res.status(200).json(editedEdition);
    } catch (e) {
        return next(e)
    }
}

exports.compare = async(req, res, next) => {
    try {
        const {edition_id} = req.params;
        const {amount} = req.body;
        let foundEdition = await db.Edition.findById(edition_id).lean().exec();

        // Check if the edition is still in business
        if(foundEdition && !foundEdition.outOfBusiness) {
            return res.status(200).json({
                available: foundEdition.amount >= amount,
                storedAmount: foundEdition.amount
            })
        }

        // if the edition can be found or not in the business anymore
        return res.status(200).json({
            available: false,
            storedAmount: 0
        });
    } catch (e) {
        return next(e);
    }
}

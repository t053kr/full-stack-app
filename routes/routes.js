const { ObjectId } = require('bson');
const express = require('express');
const router = express.Router();

const dbo = require('../dbconn');

// @route GET 
// @desc Get All Items
router.route('/collection').get(async function (_req, res) {
    const dbConnect = dbo.getDb();

    dbConnect
    .collection('books')
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});

// @route Post 
// @desc Post an item
router.route('/collection/postBook').post(function (req, res) {
    console.log(req.body);
    
    const dbConnect = dbo.getDb();
    const bookDocument = {
      _id: req.body.id,
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
    };
  
    dbConnect
      .collection('books')
      .insertOne(bookDocument, function (err, result) {
        if (err) {
          res.status(400).send('Error inserting matches!');
        } else {
          console.log(`Added a new book with title ${bookDocument.title}`);
          res.status(204).send();
        }
      });
      
  });

// @route Update 
// @desc Update an item
router.route('/collection/updateBook/:bookId').put(function (req, res) {
    const dbConnect = dbo.getDb();
    const myQuery = { _id: ObjectId(req.params.bookId) };
    const updates = {
      $set: {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
      },
    };
  
    dbConnect
      .collection('books')
      .updateOne(myQuery, updates, function (err, _result) {
        if (err) {
          res
            .status(400)
            .send(`Error updating book on books with id ${myQuery._id}!`);
        } else {
          console.log('1 document updated');
        }
      });
  });

// @route Delete 
// @desc Delete an item
router.route('/collection/delete/:bookId').delete((req, res) => {
    const dbConnect = dbo.getDb();
    const myQuery = { _id: ObjectId(req.params.bookId) };
  
    dbConnect
      .collection('books')
      .deleteOne(myQuery, function (err, _result) {
        if (err) {
          res
            .status(400)
            .send(`Error deleting book with id ${myQuery._id}!`);
        } else {
          console.log('1 document deleted');
        }
      });
  });
  

module.exports = router;
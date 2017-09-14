var ObjectID = require('mongodb').ObjectID;

function queryPost(db, query, callback) {
    var collection = db.collection('posts');
    collection.find(query).toArray(function (err, result) {
        if (err) {
            throw err;
        } else {
            db.close();
            callback(result);
        }
    });
}

function insertPost(db, body, callback) {
    var collection = db.collection('posts');
    let date = new Date();
    let document = {
        title: body.title,
        href: body.href,
        timestamp: date.getTime(),
        score: 0,
        vote: 0,
        owner: body.owner
    }
    collection.insert(document, function (err, result) {
        if (err) {
            console.log('Error:' + err);
            throw err;
        }
        console.log(result.nInserted);
        db.close();
        callback(document);
    });
}

function deletePost(db, condition, callback) {
    var collection = db.collection('posts');
    condition._id = new ObjectID(condition._id)
    collection.find(condition).toArray(function (err, queryResult) {
        if (err) {
            throw err;
        } else {
            collection.deleteOne(condition, function (err, result) {
                if (err) {
                    console.log('Error:' + err);
                    throw err;
                }
                db.close();
                callback(queryResult);
            });
        }
    });

}

module.exports = {
    queryPost: queryPost,
    insertPost: insertPost,
    deletePost: deletePost
}
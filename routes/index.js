var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});
router.post('/saveImage', function (req, res, next) {
    var data = req.body;
    var file = './images/' + data.time + '.json';
    var obj = data;
    console.log("here", obj)
    jsonfile.writeFile(file, obj, function (err) {
        console.error(err);
        res.send("ok");
    })
});
router.get('/images/:image', function (req, res, next) {
    //    res.send(outputString);
    console.log(req.params.image)
    jsonfile.readFile("./images/" + req.params.image, function (err, obj) {
        if (obj) {
            console.dir(obj.image);
            res.send(obj.image);

            //newObj["test"] = obj.image)
        }
    })

});

router.get('/henna', function (req, res, next) {
    res.render('henna', {});
})

// var itemsProcessed = 0;
router.get('/images', function (req, res, next) {
     res.render('images', {        });
    console.log("here");
//
//    var itemsProcessed = 0;
//
//    var newObj = [];
//    fs.readdir('./images', (err, files) => {
       
        //        for (var i = 0; i < files.length; i++) {
        //            console.log("./images/" + files[i]);
        //            itemsProcessed++;
        //            if (itemsProcessed === files.length){
        //                console.log("ehre", newObj)
        //               res.render('images', {
        //        images: newObj
        //    }); 
        //            }
        //            jsonfile.readFile("./images/" + files[i], function (err, obj) {
        //                if (obj) {
        ////console.dir(obj.image);
        //                    newObj.push(obj.image);
        ////newObj["test"] = obj.image)
        //                }
        //            })
        //        }

//    })

    //    console.log(newObj)

    //res.render('images', {
    //        images: newObj
    //    });
    //        files.forEach((item, index, array) => {
    //                newObj.push(item);
    ////            for ( var i = 0; i < files.length; i++){
    ////                
    ////            }
    ////            fs.readFile("images/" + files[index], 'utf8', function (err, data) {
    ////                if (err) {
    ////                    return console.log(err);
    ////                }
    ////                console.log(index);
    ////;                itemsProcessed++;
    ////                console.log(itemsProcessed, files.length)
    //            if (itemsProcessed === files.length) {
    //                //  var data = JSON.parse(data);
    ////                console.log(data);
    //                console.log("sending dat", newObj.length)
    //                 newObj.push(data);
    //                 res.send(newObj);
    //            }
    //
    //
    //            });
})

//});
module.exports = router;
var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var fs = require('fs');
var path = require('path');


// define version of fs.writeFile() that will only write the file
// if the file does not already exist and will do so without
// possibility of race conditions (e.g. atomically)
fs.writeFileIfNotExist = function (fname, contents, options, callback) {
    if (typeof options === "function") {
        // it appears that it was called without the options argument
        callback = options;
        options = {};
    }
    options = options || {};
    // force wx flag so file will be created only if it does not already exist
    options.flag = 'wx';
    fs.writeFile(fname, contents, options, function (err) {
        var existed = false;
        if (err && err.code === 'EEXIST') {
            // This just means the file already existed.  We
            // will not treat that as an error, so kill the error code
            err = null;
            existed = true;
        }
        if (typeof callback === "function") {
            callback(err, existed);
        }
    });
}
var sample = [{
    name: "Bob",
    henna: "henna1"
}];
var fileName;
var file;
// sample usage
fs.writeFileIfNotExist("./henna.json", JSON.stringify(sample), function (err, existed) {
    if (err) {
        // error here
    } else {
        // data was written or file already existed
        // existed flag tells you which case it was
        console.log("file written or exist", existed);
        //        fileName = '../henna.json';
        //        file = require(fileName);
    }
});

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


router.post('/henna-post', function (req, res, next) {
    var data = req.body;
    //    console.log(data);

    var name = req.body.name;
    var henna = req.body.selection;
    fs.readFile('./henna.json', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log("data1", data)
        data = JSON.parse(data);
        var newData = {
            "name": name,
            "henna": henna
        };
        data.push(newData);
        console.log("data", data);

        fs.writeFile("henna.json", JSON.stringify(data), function (err) {
            if (err) {
                return console.log(err);
            }

            res.send("OK")
        });

    });

})

router.post('/finish', function (req, res, next) {
    var doneData = req.body;
    console.log("here", req.body)
    fs.readFile('./henna.json', 'utf8', function (err, data) {
        if(err) {
            return console.log(err);
        }
        data = JSON.parse(data);
//        console.log(doneData[0], doneData[1])
        
        for (var i = 0; i < data.length; i++){
            console.log(doneData.name, data[i].name, doneData.selection, data[i].henna )
            if (doneData.name === data[i].name && doneData.selection === data[i].henna ){
                data[i].checked = "checked";
                console.log("FOUND MATCH", doneData.name, data[i].name, doneData.selection, data[i].henna )
            }
        }
                fs.writeFile("henna.json", JSON.stringify(data), function (err) {
            if (err) {
                return console.log(err);
            }

            res.send("OK")
        });

    });

})


router.get('/update-images/', function (req, res, next) {
    //    res.send(outputString);
    console.log(req.params.image);
    jsonfile.readFile("./henna.json", function (err, obj) {
        if (obj) {
            //            console.dir(obj.image);
            res.send(obj);

            //newObj["test"] = obj.image)
        }
    })
});


router.get('/henna', function (req, res, next) {
    res.render('henna', {});
})

// var itemsProcessed = 0;
router.get('/images', function (req, res, next) {

    jsonfile.readFile("./henna.json", function (err, obj) {
        console.log(obj)
        if (obj) {
                        console.dir(obj.image);
            //            res.send(obj);
            res.render('images', {
                images: obj
            });
            //newObj["test"] = obj.image)
        }
    })

})

//});
module.exports = router;
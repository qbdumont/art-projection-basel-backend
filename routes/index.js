var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/saveImage', function(req, res, next) {
    var data = req.body;
    var file = './images/'+data.time+'.json';
    var obj = data;
 
jsonfile.writeFile(file, obj, function (err) {
  console.error(err);
      res.send("ok");

})
  
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/hello', function(req, res, next) {
  res.json({ message: 'Hello from the Express server!' });
});

router.get('/', function(req, res, next) {
  res.sendFile(express.static(path.resolve(__dirname, '../../frontend/dist',"index.html")));
});

module.exports = router;

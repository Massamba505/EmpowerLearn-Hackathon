var express = require('express');
var path = require('path');
const request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/hello', function(req, res, next) {
  console.log("me");
  res.json({ message: 'Hello from the Express server!' });
});
router.get('/forums', (req, res) => {
  const url = 'https://lamp.ms.wits.ac.za/home/s2574120/get_forums.php';
  request(url, (error, response, body) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(body);
  });
});

router.get('/questions', (req, res) => {
  const url = 'https://lamp.ms.wits.ac.za/home/s2574120/get_questions.php';
  request(url, (error, response, body) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(body);
  });
});

router.get('/responses/:postId', (req, res) => {
  const url = `https://lamp.ms.wits.ac.za/home/s2574120/get_responses.php?post_id=${req.params.postId}`;
  request(url, (error, response, body) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(body);
  });
});

router.post('/responses', (req, res) => {
  const { post_id, username, message } = req.body;
  const url = `https://lamp.ms.wits.ac.za/home/s2574120/insert_response.php`;
  
  request.post({ url, form: { post_id, username, message } }, (error, response, body) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(body);
  });
});

router.post('/ask_question', (req, res) => {
  const { name, message } = req.body;
  console.log(name);
  console.log(message);
  const url = `https://lamp.ms.wits.ac.za/home/s2574120/qa_question.php`;

  request.post(url, {
    form: { name, message }
  }, (error, response, body) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(body);
  });
});

router.post('/posts', (req, res) => {
  const {username,message,group_name} = req.body;
  console.log(req.body)
  const url = 'https://lamp.ms.wits.ac.za/home/s2574120/insert_post.php';
  console.log(username);
  console.log(message);
  console.log(group_name);
  request.post({ url, form: {username:username,message:message,group_name:group_name} }, (error, response, body) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(body);
  });
});

router.post('/create_forum', (req, res) => {
  const { forumName, creator, description } = req.body;
  console.log(forumName);
  console.log(creator);
  console.log(description);
  const url = `https://lamp.ms.wits.ac.za/home/s2574120/create_forum.php`;

  request.post(url, {
    form: { forumName, creator, description }
  }, (error, response, body) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(body);
  });
});

router.get('/hellos', (req, res) => {
  console.log("Request received at /hello/:som");
  res.json({ message: 'Hello from the Express server!', something: req.query});
});

router.get('/forums/:target', (req, res) => {
  const url = `https://lamp.ms.wits.ac.za/home/s2574120/post_by_group.php?group_name=${req.params.target}`;
  console.log(url);
  console.log("what the ");
  request(url, (error, response, body) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(body);
  });
});
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../../frontend',"index.html"));
});

module.exports = router;

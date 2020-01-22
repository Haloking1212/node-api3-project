const express = require('express');
const Hubs = require("./userDb")
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  const { name } = req.body
  if(!name) {
    return res.status(404).json({ message: "The post with the specifed ID does not exist." })
  }
  Hubs.insert(req.body)
  .then(hub => {
    res.status(201).json(hub)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ error: "There was error while saving the comment to the database." })
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  const { name } = req.body
  if(!name) {
    return res.status(404).json({ message: "The post with the specifed ID does not exist." })
  }
  Hubs.insert(req.body)
  .then(hub => {
    res.status(201).json(hub)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ error: "There was error while saving the comment to the database." })
  })

});

router.get('/', (req, res) => {
  // do your magic!
  Hubs.get()
  .then(hubs => {
    res.status(200).json(hubs)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "error doing get request" })
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  Hubs.getById(req.params.id)
  .then(hubs => {
    res.status(200).json(hubs)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "error doing get request" })
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  Hubs.getUserPosts(req.params.id)
  .then(hubs => {
    res.status(200).json(hubs)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "error doing GET request" })
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Hubs.remove(req.params.id)
  .then(count => {
    if(count > 0){
      return res.status(200).json({ message: "The Post has been deleted" })
    } else {
      return res.status(404).json({ message: "The Post with the specified ID does not exist." })
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ error: "The Post could not be deleted." })
  })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const changes = req.body;
  Hubs.update(req.params.id, changes)
  .then(hub => {
    if(hub){
      return res.status(200).json(hub);
    } else {
      return res.status(404).json({ message: "The Post with the specidied ID does not exist." })
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "This post could not be modifed." })
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  // const { id } = req.params;
  Hubs.getById(req.params.id)
  .then(hub => {
    if(req.params.id) {
      req.hub = hub
      res.status(201).json({ message: "User Validated" })
      next()
    } else {
      next(new Error("Does not exist"));
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: "error doing PUT request" })
  })
};


function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;

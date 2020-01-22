const express = require('express');
const Hubs = require("./postDb")
const router = express.Router();

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
  console.log(req.params.id,"testing")
  Hubs.getById(req.params.id)
  .then(hub => {
    if(hub){
      return res.status(200).json(hub)
    } else {
      return res.status(404).json({ message: "This ID does not exist." })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "This GET information could not be retrieved" })
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

router.put('/:id', (req, res) => {
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

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  
}

module.exports = router;

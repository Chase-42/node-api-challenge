const express = require("express");
const db = require("../data/helpers/actionModel");

const router = express.Router();

// GET -- tested via insomnia and working!
router.get("/", (req, res, next) => {
  db.get()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

// POST -- tested via insomnia and working!
router.post("/", (req, res, next) => {
  db.insert(req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

// PUT -- tested via insomnia and working!
router.put("/:id", validateId(), (req, res, next) => {
  db.update(req.params.id, req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

// DELETE -- tested via insomnia and working!
router.delete("/:id", validateId(), validateAction(), (req, res) => {
  db.remove(req.params.id)
    .then(response => {
      res.json({
        message: "Project was successfully deleted.",
        response
      });
    })
    .catch(err => {
      next(err);
    });
});

// Middleware

function validateId() {
  return (req, res, next) => {
    db.get(req.params.id)
      .then(action => {
        if (action) {
          req.action = action;
          next();
        } else {
          res.status(400).json({
            messag: "Invalid ID"
          });
        }
      })
      .catch(err => {
        next(err);
      });
  };
}

function validateAction() {
  return (req, res, next) => {
    const action = req.body;
    if (!action.project_id) {
      res.status(400).json({
        message: "Please provide a valid project ID for the action. "
      });
    } else if (!action.notes) {
      res.status(400).json({
        message: "Please provide the required notes field in the action."
      });
    } else if (!action.description) {
      res.status(400).json({
        message: "Please provide the required description field in the action. "
      });
    } else {
      next();
    }
  };
}

module.exports = router;

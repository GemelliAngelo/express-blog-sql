// # EXPRESS INPORT
const express = require("express");

// # ROUTER CONFIG
const router = express.Router();

// # CONTROLLER INPORT
const postsController = require("../controllers/postsController.js");

// # ROUTER METHOD
router.get("/", postsController.index);
router.get("/:id", postsController.show);
router.post("/", postsController.store);
router.put("/:id", postsController.update);
router.patch("/:id", postsController.modify);
router.delete("/:id", postsController.destroy);

// # EXPORTS
module.exports = router;

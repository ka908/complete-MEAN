const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  addUser,
  getUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../handlers/userhandlers");

router.get("/users", async (req, res) => {
  const data = await getUser();
  return res.json({ msg: data });
});
router.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid ID format" });
  }
  const data = await getUserById(id);
  return res.json({ msg: data });
});

router.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid ID format" });
  }
  const data = await updateUserById(id, req.body);
  return res.json({ msg: data });
});
router.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid ID format" });
  }
  const data = await deleteUserById(id);
  return res.json({ msg: data });
});

router.post("/users", async (req, res) => {
  const data = await addUser(req.body);
  return res.json({ msg: data });
});

module.exports = router;

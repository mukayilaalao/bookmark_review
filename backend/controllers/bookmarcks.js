const express = require("express");
const router = express.Router();
const { checkName, checkBoolean } = require("../validation/checkBookmarks.js");
const {
  getAllBookmarks,
  getBookmark,
  createBookmark,
  deleteBookmark,
  updateBookmark,
} = require("../queries/bookmarks.js");
//Index

router.get("/", async (req, res) => {
  const allBookmarks = await getAllBookmarks();
  if (allBookmarks[0]) {
    res.status(200).json(allBookmarks);
  } else {
    res.status(500).json({ error: "server error" });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const bookmark = await getBookmark(id);
  if (bookmark.id) res.json(bookmark);
  else res.status(500).json({ error: "server error" });
});
//create a bookmark
router.post("/", checkName, checkBoolean, async (req, res) => {
  const createdBookmark = await createBookmark(req.body);
  res.json(createdBookmark);
});
//delete a bookmark
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedBookmark = await deleteBookmark(id);
  if (deletedBookmark.id) res.json(deletedBookmark);
  else res.status(404).json({ error: "Bookmark not found" });
});
//update a bookmark
router.put("/:id", checkName, checkBoolean, async (req, res) => {
  const { id } = req.params;
  const updatedBookmark = await updateBookmark(id, req.body);
  if (updatedBookmark.id) res.json(updatedBookmark);
  else res.status(404).json({ error: "error updating bookmark" });
});
module.exports = router;

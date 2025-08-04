const express = require("express");
const router = express.Router();
const issueController = require("../controllers/issues");
const { verifyToken, isAdmin } = require("../middlewares/validate");
const { upload } = require("../middlewares/multer.middleware");

// POST: Create a new issue
// XSS sanitization is now handled by global middleware
router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    await issueController.createIssue(req, res);
  } catch (err) {
    next(err);
  }
});

// PATCH: Update issue status (Admin only)
// XSS sanitization is now handled by global middleware
router.patch("/:id/status", verifyToken, isAdmin, async (req, res, next) => {
  try {
    await issueController.updateIssueStatus(req, res);
  } catch (err) {
    next(err);
  }
});

// GET: All issues
router.get("/", issueController.getAllIssues);

module.exports = router;

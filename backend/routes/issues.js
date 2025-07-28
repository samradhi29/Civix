const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issues');
const { verifyToken, isAdmin } = require('../middlewares/validate');
const { upload } = require("../middlewares/multer.middleware");
const xss = require('xss');


// POST: Create a new issue
router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    const sanitizedBody = {
      title: xss(req.body.title),
      description: xss(req.body.description),
      location: xss(req.body.location),
      category: req.body.category ? xss(req.body.category) : undefined,
    };

    req.body = { ...req.body, ...sanitizedBody };
    await issueController.createIssue(req, res);
  } catch (err) {
    next(err);
  }
});

// PATCH: Update issue status (Admin only)
router.patch('/:id/status', verifyToken, isAdmin, async (req, res, next) => {
  try {
    if (req.body.newStatus) {
      req.body.newStatus = xss(req.body.newStatus);
    }
    await issueController.updateIssueStatus(req, res);
  } catch (err) {
    next(err);
  }
});

// GET: All issues
router.get('/', issueController.getAllIssues);

module.exports = router;

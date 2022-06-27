const express = require(`express`);
const controller = require(`../controllers/controller`);
const router = require(`express`).Router();

const app = express();

router.get(`/`, controller.getHomepage);
router.get('/account', controller.getAccountPage);
router.post(`/upload`, controller.uploadPost);

module.exports = router;
const router = require('express').Router();
const thoughtPaths = require('./thoughtPaths');
const usersPaths = require('./usersPaths');

router.use('/thoughts', thoughtPaths);
router.use('/users', usersPaths);

module.exports = router;

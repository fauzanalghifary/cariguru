const router = require('express').Router();
const Controller = require('../Controllers/controller');

router.get('/',);
router.get('/register',);
router.post('/register',);
router.get('/login',);
router.post('/login',);

router.get('/teachers', Controller.readTeachers);
router.get('/admin', Controller.adminPage);

module.exports = router;
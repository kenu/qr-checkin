const express = require('express');
const router = express.Router();
const { rootController } = require('../controller');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

router.get('/', ensureLoggedIn(), rootController.home);
router.get('/login', rootController.login);
router.get('/login/google', rootController.oauthGoogleLogin);

//TODO: return 에서 login/google/callback 으로 변경 고려
router.get('/return', rootController.authenticateUser, (req, res) => {
  res.redirect('/');
});
//TODO: 아래처럼 처리했을 때 왜 안되는지 확인
// router.get('/return', rootController.authenticateUser);

router.get('/logout', rootController.logout);

module.exports = router;

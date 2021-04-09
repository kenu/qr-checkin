const passport = require('passport');
const getDataUrl = require('../util/qrcodeUtil');

let rootController = {
  home: async (req, res) => {
    const data = req.user ? req.user.emails[0].value : '';
    const url = await getDataUrl(data);
    res.render('home', { user: req.user, dataurl: url });
  },

  login: (req, res) => {
    res.render('login');
  },

  oauthGoogleLogin: passport.authenticate('google'),

  authenticateUser: passport.authenticate('google', {
    failureRedirect: '/login',
  }),

  //TODO: 아래처럼 했을 때 왜 안되는지 확인
  //   authenticateUser: async (req, res) => {
  //     await passport.authenticate('google', {
  //       failureRedirect: '/login',
  //     });
  //     // res.redirect('/');
  //   },

  logout: (req, res) => {
    req.logout();
    res.redirect('/');
  },
};

module.exports = {
  home: rootController.home,
  login: rootController.login,
  oauthGoogleLogin: rootController.oauthGoogleLogin,
  authenticateUser: rootController.authenticateUser,
  logout: rootController.logout,
};

const userRoute = require('./user.route');
module.exports = function(app, database, admin) {
  userRoute(app, database, admin);
};

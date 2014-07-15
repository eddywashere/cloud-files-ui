'use strict';

var errorPage = {
  404: '404',
  500: 'error'
};

module.exports = {

  // development error handler
  // will print stacktrace
  development: function(err, req, res, next) {
    var customError = {
      message: err.message,
      error: err
    };

    res.status(err.status || 500);
    res.format({
      json: function(){
        res.json(customError);
      },
      html: function(){
        res.render(errorPage[err.status] || 'error', customError);
      }
    });
  },

  // production error handler
  // no stacktraces leaked to user
  production: function(err, req, res, next) {
    var customError = {
      message: err.message || 'Not Found',
      error: false
    };
    res.status(err.status || 500);
    res.format({
      json: function(){
        res.json(customError);
      },
      html: function(){
        res.render(errorPage[err.status] || 'error', customError);
      }
    });
  }
};

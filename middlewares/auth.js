module.exports = (app) => {
    const JWTManager = app.utils.jwt;
  
    this.authorization = function(req, res, next) {
      let token = req.headers['x-access-token'];
      if(!token) {
        return res.status(401).json({ error: {type: 401, message: 'Token is required'}});
      }
      JWTManager.decyptAuthTokenCb(token, (error, dataFromToken) => {
        if(error) {
          return res.status(401).json({ error: {type: 401, message: 'Invalid token [1]'}});
        }
  
        if(!dataFromToken.id) {
          return res.status(401).json({ error: {type: 401, message: 'Invalid token [2]'}});
        }
  
        return next();
      });
    };
  
    return this;
  };
  
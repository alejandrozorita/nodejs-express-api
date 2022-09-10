function logErrors (error, req, res, next) {
  console.error(error);
  next(error)
}

function errorHandler (error, req, res, next) {
  res.status(500).json({
    message: error.message,
    stack: error.stack
  });
  next()
}


function boomErrorHandler (error, req, res, next) {
  if(error.isBoom) {
    const {outPut} = error;
    res.status(outPut.statusCode).json(outPut.payload)
  }
  next()
}

module.exports= {logErrors, errorHandler, boomErrorHandler}

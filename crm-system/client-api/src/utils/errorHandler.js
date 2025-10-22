const handleError = (err, res) => {
  console.log(err);
  res.status(err.status || 500);
  res.json({
    from: "errorHandler",
    message: err.message,
  });
};

export default handleError;

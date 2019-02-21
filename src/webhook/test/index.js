function test (req, res, next) {
  console.log(req.body, req.file);
  res.status(200).json({body: req.body, file: req.file})
}

module.exports = {test}

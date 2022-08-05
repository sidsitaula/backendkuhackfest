const notFound = (req, res) => res.status(404).send("UNKOWN ROUTE");

module.exports = notFound;

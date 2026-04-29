const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    // console.log("RAW HEADER:", token);
    // console.log("SECRET:", process.env.JWT_SECRET);

    // if (token && token.startsWith("Bearer ")) {
    //   token = token.split(" ")[1];
    // }

   // console.log("FINAL TOKEN:", token);

    if (!token) {
      return res.status(401).json({ msg: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   // console.log("DECODED:", decoded);

    req.user = decoded;
    next();

  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json({ msg: err.message });
  }
};
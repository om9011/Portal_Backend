const jwt = require("jsonwebtoken");
exports.auth = (req, res, next) => {
  try {
    // const { token } = req.body || req.cookie.token;
    const token = req.body.token || req.cookies.token;

    const result = jwt.verify(token, "token");
    console.log(result);
    console.log("User Role :", result.role);
    console.log("Cookies",req.cookies)
    // add token at
    req.user = result;
    // console.log("Cookies at auth ",req)
    // return res.status(200).json({
    //     message:"Token decoded sucessfully",
    //     token:result
    // })
    next();
  } catch (e) {
    console.log("ERROR AT AUTHENTICATION: ", e.message);
    return res.status(505).json({
      message: "Something went wrong at Auth ",
      error: e.message,
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role != "Student") {
      return res.status(401).json({
        // and we done req.user = decode; So accountType is also saved in user
        success: false,
        message: "This is a protected route for Students only",
      });
    }
    next();
  } catch (e) {
    console.log("ERROR AR STUDENT VALIDATION :", e.message);
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role != "Admin") {
      return res.status(401).json({
        // and we done req.user = decode; So accountType is also saved in user
        success: false,
        message: "This is a protected route for Admin only",
      });
    }``
    next();
  } catch (e) {
    console.log("ERROR AR STUDENT VALIDATION :", e.message);
  }
};

exports.isAuthenticate = (req, res, next) => {
  try {
    if (req.user.role != "Operator" && req.user.role != "Admin") {
      return res.status(401).json({
        // and we done req.user = decode; So accountType is also saved in user
        success: false,
        message: "This is a protected route for Operator  only",
      });
    }
    next();
  } catch (e) {
    console.log("ERROR AR STUDENT VALIDATION :", e.message);
  }
};

const User = require("../models/user");
const crypto= require('crypto')


exports.getAllusers = async (req, res, next) => {
  try {
    const [users, _] = await User.findAll();

    res.status(200).json({ count: users.length, users });
  } catch (error) {
    next(error);
  }
};

exports.createNewuser = async (req, res, next) => {
  try {
    
    let { username, email, password } = req.body;
    let user = new User(username, email, getHashedPassword(password));

    user = await user.save();

    res.status(201).json({ message: "user created" });
  } catch (error) {
    next(error);
  }
};

exports.getuserById = async (req, res, next) => {
  try {
    let userId = req.params.id;

    let [user, _] = await User.findById(userId);

    res.status(200).json({ user: user[0] });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
  console.log("rrying");
    let { username, password } = req.body;
    let user = await User.finduser(username);
    if (user[0].length==0) {
      console.log(111, user[0].length)
      res.status(404).json({error:"not found login"})
      return
    }
    if (user[0][0].password != getHashedPassword(password)) {
      console.log(user[0][0]);
      console.log(getHashedPassword(password));
      res.status(404).json({error:"unable to login"})
      return
    }

    res.status(200).json({ user: user[0][0] });
  } catch (error) {
    next(error);
  }
};
const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}
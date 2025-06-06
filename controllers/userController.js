const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.protectionMW = async (req, res, next) => {
  try {
    let token;
    // 1) bech nthabat ken el user 3andou token or not
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        message: "You are not logged in !!!",
      });
    }
    // 2) bech nchouf si el token is valid or not
    const verifiedToken = await promisify(jwt.verify)(
      token,
      process.env.SECRET_KEY
    );
    // console.log(verifiedToken);
    // 3) bech nchouf si el user moula el token still exist or not
    const user = await User.findById(verifiedToken.id);
    if (!user) {
      return res.status(404).json({
        message: "This user no longer exists !!!",
      });
    }
    // 4) si el token tsan3et 9bal ou bien ba3d last password update
    if (!user.validToken(verifiedToken.iat)) {
      return res.status(401).json({
        message: "This token is no longer valid !!!",
      });
    }
    req.role = user.role;
    return next();
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

exports.canDoThis = () => {};

exports.signup = async (req, res) => {
  try {
    // Solution 1 :
    // const newUser = await User.create({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: req.body.password,
    //   confirmPassword: req.body.confirmPassword,
    //   role: "user",
    // });
    // Solution 2 :
    // const { name, email, password, confirmPassword } = req.body;
    // const newUser = await User.create({
    //   name,
    //   email,
    //   password,
    //   confirmPassword,
    //   role: "user",
    // });
    // Solution 3 :
    const newUser = await User.create({ ...req.body, role: "user" });
    res.status(201).json({
      message: "User created !!!",
      data: { newUser },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required !!!",
      });
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.compairPass(password, user.password))) {
      return res.status(404).json({
        message: "email or password are incorrect !!!",
      });
    }
    const { id, name } = user;
    const token = jwt.sign({ id, name }, process.env.SECRET_KEY, {
      expiresIn: "90d",
    });
    res.status(201).json({
      message: "connection reussite !!!",
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      message: "User created !!!",
      data: { newUser },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "User updated !!!",
      data: { updatedUser },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "user not found !!" });
    }
    res.status(204).json({
      message: "User Deleted !!!",
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "user not found !!" });
    }
    res.status(200).json({
      message: "User Fetched !!!",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users Fetched !!!",
      data: { users },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

const User = require("../models/User");
const bcrypt = require("bcrypt");

// exports.createUser = async (req, res) => {
//   const { username, password, role } = req.body;
//   if (!username || !password || !role) {
//     return res.status(400).send("Missing required fields");
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = {
//     username,
//     hashedPassword,
//     role: parseInt(role),
//     profile_pic: "default.png",
//     favourites: [],
//   };
//   const createdUser = User.create(newUser);

//   res.json({ message: "User created successfully", user: createdUser });
// };

exports.addFavourite = (req, res) => {
  const userId = parseInt(req.params.id);
  const { cabinId } = req.body;

  const user = User.getById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.favourites.push(cabinId);
  User.update(userId, { favourites: user.favourites });

  res.json({ message: "Favourite added successfully", user });
};

exports.signupForm = (req, res) => {
  res.render("signin1");
};

exports.signupStep2Form = (req, res) => {
  const { role } = req.query;
  if (!role) return res.redirect("/users/signup");
  res.render("signin2", { role });
};

exports.signupComplete = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role)
    return res.status(400).send("Missing fields");

  const encryptedpassword = await bcrypt.hash(password, 10);

  const newUser = {
    username,
    password: encryptedpassword,
    role: parseInt(role),
    profile_pic: "",
    favourites: [],
  };
  const createdUser = User.create(newUser);

  res.send(`Account created! Welcome, ${createdUser.username}`);
};

exports.loginPage = (req, res) => {
  res.render("login");
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = User.getByUsername(username);
  if (user.username !== username) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    req.session.userId = user.id;
    req.session.role = user.role;
    req.session.username = user.username;

    res.redirect("/cabins/feed");
    // res.json({ success: true, userId: user.id });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials2" });
  }
};

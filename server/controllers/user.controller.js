const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Cart = require('../models/Cart');
const { registerValidation, loginValidation } = require("../helper/validation");

exports.registerController = async (req, res) => {
  const { name, surname, email, password, role } = req.body;

  const { error } = registerValidation({ name, email, password });
  if (error) return res.status(400).json({ error: error.details[0].message });

  const emailExist = await User.findOne({ email: email });
  if (emailExist)
    return res.status(400).json({ error: "Böyle bir email zaten var." });

  const salt = await bcyrpt.genSalt(10);
  const hashedPassword = await bcyrpt.hash(password, salt);

  const user = new User({
    name,
    surname,
    email,
    password: hashedPassword,
    role,
  });

  try {
    const savedUser = await user.save();
    
    const newCart = new Cart({user: savedUser._id});
    await newCart.save();

    res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu." });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

exports.loginController = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "Email veya şifre hatalı!" });

  const validPass = await bcyrpt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).json({ error: "Email veya şifre hatalı!" });

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.TOKEN_SECRET,
    { expiresIn: "3h" }
  );

  const data = {
    _id: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
  };
  res.status(200).json({ token, data });
};


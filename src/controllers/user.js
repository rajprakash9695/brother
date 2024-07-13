import bcrypt from 'bcryptjs';
import { sendResponse } from '../helpers/helper.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();

    if (!user) {
      return sendResponse(res, 404, 'User not found');
    }
    return sendResponse(res, 200, 'success', {
      count: user.length,
      data: user,
    });
  } catch (error) {
    console.log(error);
    sendResponse(res, 400, error);
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return sendResponse(res, 400, 'User already exist');
    }
    if (!name || !email || !password || !mobile) {
      return sendResponse(res, 400, 'All fields are required!');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      mobile: mobile,
    });

    if (newUser) {
      console.log(newUser);
      return sendResponse(res, 200, 'success', { data: newUser });
    }
  } catch (error) {
    console.log(error);
    sendResponse(res, 400, error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return sendResponse(res, 404, 'email does not exist');
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return sendResponse(res, 404, 'Password is incorrect');
    }

    const token = jwt.sign(process.env.JWT_SECRET, { expiresIn: '100d' });
    console.log(token);

    return sendResponse(res, 200, 'success', token);
  } catch (error) {
    console.log(error);
    sendResponse(res, 400, error);
  }
};

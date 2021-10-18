const User = require("../models/userModel");
const Course = require("../models/courseModel");
const EnrolledCourse = require("../models/enrolledCourseModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { roles } = require("../roles");
const { ObjectId } = require("mongodb");
const Result = require("../models/marks");

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.signup = async (req, res, next) => {
  try {
    const { name, username, password, role } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      name,
      username,
      password: hashedPassword,
      role: role || "student",
    });
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    newUser.accessToken = accessToken;
    await newUser.save();
    res.json({
      data: newUser,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return next(new Error("Username does not exist"));
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) return next(new Error("Password is not correct"));
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    await User.findByIdAndUpdate(user._id, { accessToken });
    res.status(200).json({
      data: {
        name: user.name,
        username: user.username,
        role: user.role,
        success: true,
        id: user._id,
      },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    data: users,
  });
};

exports.getUser = async (req, res, next) => {
  try {
    const role = req.params.role;
    const user = await User.find({ role: role });
    if (!user) return next(new Error("User does not exist"));
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await hashPassword(password);
    const userId = req.params.userId;
    console.log(userId, hashedPassword);
    await User.findByIdAndUpdate(ObjectId(userId), {
      password: hashedPassword,
    });
    const user = await User.findById(ObjectId(userId));
    res.status(200).json({
      data: user,
      message: "password has been updated",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete({ _id: ObjectId(userId) });
    res.status(200).json({
      data: null,
      message: "User has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

exports.allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    if (!user)
      return res.status(401).json({
        error: "You need to be logged in to access this route",
      });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

exports.addCourse = async (req, res, next) => {
  try {
    const { name, instructor, img } = req.body;
    const newCourse = new Course({ name, instructor, img });
    await newCourse.save();
    res.json({
      data: newCourse,
      success: "course created successfully!",
    });
  } catch (error) {
    next(error);
  }
};

exports.createCourse = async (req, res, next) => {
  try {
    const {
      courseName,
      courseId,
      courseTeacher,
      courseCredit,
      classRoomNum,
      classDay,
      startTime,
      endTime,
    } = req.body;

    const newCourse = new Course({
      courseName,
      courseId,
      courseTeacher,
      courseCredit,
      classRoomNum,
      classDay,
      startTime,
      endTime,
    });

    await newCourse.save();
    res.json({
      data: newCourse,
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
    });
    next(error);
  }
};

exports.getCourse = async (req, res, next) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

exports.CourseByTeacher = async (req, res, next) => {
  try {
    const courseTeacher = req.params.name;
    const courses = await Course.find({ courseTeacher: courseTeacher });
    res.status(200).json({
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

exports.enrolledCourse = async (req, res, next) => {
  try {
    const enrolledCourse = req.body;
    const enrolledCourses = EnrolledCourse.insertMany(enrolledCourse);
    res.json({
      data: enrolledCourses,
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
    });
    next(error);
  }
};

exports.enrolledCourses = async (req, res, next) => {
  try {
    const username = req.query.username;
    const courses = await EnrolledCourse.find({ username: username });
    res.status(200).json({
      data: courses,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Course.findByIdAndDelete({ _id: ObjectId(id) });
    res.status(200).json({
      data: null,
      message: "Course has been deleted",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllEnrolledCourse = async (req, res, next) => {
  try {
    const allEnrolledCourse = await EnrolledCourse.find({});
    res.status(200).json({
      data: allEnrolledCourse,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

exports.marks = async (req, res, next) => {
  try {
    const { username, marks, courseName } = req.body;
    const newData = await new Result({
      courseName,
      username,
      marks,
    });
    await newData.save();
    res.status(200).json({
      data: newData,
      success: true,
      message: "Marks added successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getMarkByUser = async (req, res, next) => {
  try {
    const username = req.query.username;
    const result = await Result.find({ username: username });
    res.status(200).json({
      data: result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

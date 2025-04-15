const User = require('../models/userModel')
const Roommate = require('../models/roommateModel')


exports.getLoginPage = async (req, res) => {
    res.render('./user/login'); 
};
  
exports.login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  try{
    let user = await User.findOne({email: email});
    if(!user){
      console.log('incorrect email, user not found');
      res.redirect('/user/login');
    };
    if(await user.comparePassword(password)){
      req.session.user = {
        _id: user._id,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      };
      res.redirect('/');
    } else{
      console.log('incorrect password');
      res.redirect('/user/login');
    };
  } catch (err){
    console.log(err.message);
  };
};

exports.getSignUpPage = async (req, res) => {
  return res.render('./user/signup')
};

exports.signUp = async (req, res) => {
  try{
    let user = new User(req.body);
    await user.save();
    res.redirect('/user/login')
  }
  catch(err){
    console.log(err.message);
  }
};

exports.getProfilePage = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/user/login');
    }

    console.log(req.session.user._id)
    const posts = await Roommate.find({ poster: req.session.user._id });

    const commentedPosts = await Roommate.find({
      comments: { $elemMatch: { author: req.session.user.firstName + ' ' + req.session.user.lastName } }
    });

    res.render('./user/profile', {
      user: req.session.user,
      posts,
      commentedPosts
    });
  } catch (err) {
    console.log(err.message)
  }
};

exports.logout = async (req, res) => {
  try{
    await req.session.destroy();
    res.redirect('/');
  } catch{ (err)
    console.log(err.message)
  };
};
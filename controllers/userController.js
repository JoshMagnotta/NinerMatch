const model = require('../models/userModel')

exports.getLoginPage = async (req, res) => {
    res.render('./user/login'); 
};
  
exports.login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  try{
    let user = await model.findOne({email: email});
    if(!user){
      console.log('incorrect email, user not found');
      res.redirect('/user/login');
    };
    if(await user.comparePassword(password)){
      req.session.user = {
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
    let user = new model(req.body);
    await user.save();
    res.redirect('/user/login')
  }
  catch(err){
    console.log(err.message);
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
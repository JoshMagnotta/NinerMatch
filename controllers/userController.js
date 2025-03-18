exports.renderLoginPage = (req, res) => {
    res.render('user/login'); 
  };
  
  exports.handleLogin = (req, res) => {
    const { username, password } = req.body;  
  
    // Test login where username and password are 'test' and 'password'
    if (username === 'test' && password === 'password') {
      res.redirect('/');  
    } else {
      res.render('user/login', { error: 'Invalid username or password' });
    }
  };
  
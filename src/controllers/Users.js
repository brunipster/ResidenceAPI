const usersCtrl = {};

const User = require('@Models/User');
const { user } = require('@Utils/routes');
const { generateToken } = require('@Utils/JWTHelper');
const { UserRoles, UserStates } = require('@Utils/constants');

async function registerUser (user, res){
  const { name, last_name,email, password, rol} = user;
  if (validateRegisterUser(user) > 0) {
    res.json(errors, 400);
  } else {
    try {
      const emailUser = await User.findOne({ email: email });
      if (emailUser) {
        res.send([{code:409, message:"Email is already in use"}], 400);
      } else {
        try {
          let newUser = new User({ name,lastName:last_name, email, password, rol });
          newUser.password = await newUser.encryptPassword(password);
          newUser = await newUser.save();
          return {code:200, id: newUser._id};
        } catch (error) {
          return {code:500};
        }
      }
    } catch (error) {
      return {code:500};
    }
  }
}

function validateRegisterUser(user){
  let errors = [];
  const { name, last_name, email, password, confirm_password} = user;
  if(name){
    errors.push({ code: 455, message: "Name empty"});
  }
  if(last_name){
    errors.push({ code: 455, message: "Lastname empty"});
  }
  if(email){
    errors.push({ code: 456, message: "Email empty"});
  }
  if (password != confirm_password) {
    errors.push({ code: 457, message: "Passwords do not match." });
  }
  if (password.length < 4) {
    errors.push({ code: 458, message: "Passwords must be at least 4 characters." });
  }

  return errors
}

usersCtrl.registerGuest = async (req, res) => {
  let bodyUser = req.body;
  bodyUser.rol = UserRoles.GUEST;
  const result = await registerUser(bodyUser)
  if(result.code === 200){
    res.send({code: 200 ,message:result.id});
  }else if(result === 500){
    res.send([{code: 500 ,message:"Unknown message"}], 500);
  }
};

usersCtrl.registerMember = async (req, res) => {
  let bodyUser = req.body;
  bodyUser.rol = UserRoles.MEMBER;
  const result = await registerUser(bodyUser)
  if(result.code === 200){
    res.send({code: 200 ,message:result.id});
  }else if(result === 500){
    res.send([{code: 500 ,message:"Unknown message"}], 500);
  }
};

usersCtrl.registerGuard = async (req, res) => {
  let bodyUser = req.body;
  bodyUser.rol = UserRoles.MEMBER;
  const result = await registerUser(bodyUser)
  if(result.code === 200){
    res.send({code: 200 ,message:result.id});
  }else if(result === 500){
    res.send([{code: 500 ,message:"Unknown message"}], 500);
  }
}

usersCtrl.registerAdmin = async (req, res) => {
  let bodyUser = req.body;
  bodyUser.rol = UserRoles.ADMIN;
  const result = await registerUser(bodyUser)
  if(result.code === 200){
    res.send({code: 200 ,message:result.id});
  }else if(result === 500){
    res.send([{code: 500 ,message:"Unknown message"}], 500);
  }
}

usersCtrl.signin = async(req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  const match = await user.matchPassword(password);
  if(match) {
    if(user.state !== UserStates.BLOCKED){
      try {
        await User.updateOne({ email: email}, {lastLogin: new Date(), state: UserStates.ACTIVE})
        res.json({code:200, token:generateToken(user._id)}, 200)
      } catch (error) {
        res.send("error",500);    
      }
    }else{
      res.send({code:401, message:"User blocked"}, 401)
    }
  } else {
    res.send("error",500);
  }
};

module.exports = usersCtrl;
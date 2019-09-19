const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { USER, TOKEN_EXPIRES_IN, ADMIN } = require('../../config/keys');
const {
  validateLoginInput,
  validateRegisterInput
} = require('../validations/auth');
//  Load user model
const { User } = require('../models');

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const { errors } = validateLoginInput(req.body);
  if (Object.keys(errors).length) {
    return res.status(403).json(errors);
  }

  //  Find user by email
  return User.findOne({ email }).then(dbUser => {
    // Check for User
    if (!dbUser) {
      return res.status(401).json({ errors: 'User not found' });
    }
    //  Check password
    return bcrypt
      .compare(password, dbUser.password)
      .then(isMatch => {
        if (isMatch) {
          if (dbUser.role === 'admin') {
            const user = {
              id: dbUser.id,
              firstName: dbUser.firstName,
              lastName: dbUser.lastName,
              email: dbUser.email,
              admin: true
            };
            return jwt.sign(
              user,
              ADMIN,
              { expiresIn: TOKEN_EXPIRES_IN },
              (err, token) => {
                if (token) {
                  return res.json({
                    success: true,
                    adminToken: `Bearer ${token}`,
                    userId: user.id,
                    expiresIn: TOKEN_EXPIRES_IN
                  });
                }

                return res
                  .status(500)
                  .json({ errors: 'Somthing went wrong', err });
              }
            );
          } // if no admin sign in user
          const user = {
            id: dbUser.id,
            firstName: dbUser.firstName,
            lastName: dbUser.lastName,
            email: dbUser.email
          };
          //  Sign Token
          return jwt.sign(
            user,
            USER,
            { expiresIn: TOKEN_EXPIRES_IN },
            (err, token) => {
              if (token) {
                res.json({
                  success: true,
                  userToken: `Bearer ${token}`,
                  expiresIn: TOKEN_EXPIRES_IN
                });
              }
              return res
                .status(500)
                .json({ errors: 'Somthing went wrong', err });
            }
          );
        }
        // no user found send 403 with message
        return res.status(401).json({ errors: 'User not found' });
      })
      .catch(err => {
        if (err) {
          return res
            .status(500)
            .json({ errors: 'Somthing went wrong :/', err });
        }
      });
  });
};

exports.register = async (req, res, next) => {
  try {
    const { errors } = validateRegisterInput(req.body);
    if (Object.keys(errors).length) {
      return res.status(403).json(errors);
    }
    //  Check if email already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      errors.global = 'מייל כבר רשום במערכת';
      return res.status(400).json(errors);
    }
    //  Create new user
    const newUser = await new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });
    //  Hash the password
    await bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (e, hash) => {
        if (e) {
          errors.bcrypt = 'קרתה תקלה נסו שוב מאוחר יותר';
          return res.status(400).json(errors);
        }
        newUser.password = hash;
        await newUser.save();
        const message = {
          message: 'מנהל נרשם בהצלחה'
        };
        return res.status(201).json(message);
      });
    });
  } catch (err) {
    console.log('log 8');
    const error = new Error('אופס משהו השתבש נסו שוב מאוחר יותר');
    return next(error);
  }
};

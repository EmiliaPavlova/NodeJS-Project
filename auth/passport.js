
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { Strategy } from 'passport-local';

import flash from 'connect-flash';

const configAuth = (app, data) => {

  passport.use(new Strategy({
    passReqToCallback : true
  },
    (req, username, password, done) => {
      const user = data.find(user => user.username === username);

      if (!user) {
        // return done(null, false, req.flash('message', 'No such user'));
        return done('No such user');
      }
      if (user && user.password !== password) {
        // return done(null, false, { message: 'Wrong password' });
        return done('Wrong password');
      }
      console.log(user);
      // return user;
      return done(null, user);
    }
  ));

  app.use(cookieParser());
  app.use(session({ secret: 'more secret' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    const user = data.find(user => user.id === id)
      done(null, user);
  });
};

module.exports = configAuth;
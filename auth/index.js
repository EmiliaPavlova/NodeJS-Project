
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { Strategy } from 'passport-local';

const configAuth = (app, data) => {

  passport.use(new Strategy(
    (username, password, done) => {
      const user = data.find(user => user.username === username);

      if (!user) {
        return 'No such user';
      }
      if (user && user.password !== password) {
        return 'Wrong password';
      }
      // console.log(user);
      return user;
    }
  ));

  app.use(cookieParser());
  app.use(session({ secret: 'more secret' }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    const user = data.find(user => user.id === id)
      done(null, user);
  });
};

module.exports = configAuth;
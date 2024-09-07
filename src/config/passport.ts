// import passport from 'passport';
// import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
// const { signInUser, createUser } = require('../server/controllers/userController');
// import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } from '../utils/secrets';
// import { SignUpRequestBody, User } from '../common/types/userTypes';
// const { query } = require('../server/models/dbClient');
// const { getUserByEmail } = require('../server/queries/userQueries');

// passport.use(new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: GOOGLE_CALLBACK_URL,
// },
//   async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {
//     try {
//       if (!profile.emails?.[0]?.value) {
//         throw new Error('Email is missing from the user profile');
//       }

//       const email = profile.emails[0].value;

//       const userResult = await query(getUserByEmail, [email]);

//       // mock req & res objects
//       const req = { body: {} as SignUpRequestBody };
//       const res = {
//         locals: {
//             user: {} as User,
//             newUser: {} as User,
//         },
//         cookie: () => {},
//       };

//       const next = (err?: any) => {
//         if (err) return done(err);
//         if (res.locals.user) {
//           // if user found, pass existing user
//           return done(null, res.locals.user);
//         } else if (res.locals.newUser) {
//           // if new user created, pass new user
//           return done(null, res.locals.newUser);
//         }
//         return done(new Error('User creation failed'));
//       };

//       if (userResult.rows.length > 0) {
//         req.body = { email } as SignUpRequestBody;
//         await signInUser(req as any, res as any, next);
//       } else {
//         req.body = {
//           email,
//           username: profile.displayName || 'Unknown',
//           password: '',
//           age: null,
//           region: null,
//         } as SignUpRequestBody;
        
//         await createUser(req as any, res as any, () => {});
//         return done(null, res.locals.newUser);
//       }
//     } catch (error) {
//       return done(error);
//     }
//   }
// ));



// // serializing user - not sure if this works
// // for some reason I can't use the User type so I'm not sure
// // might need to look into Express.User / express sessions
// passport.serializeUser((user, done: (err: any, id?: any) => void) => {
//     done(null, user);
//   });
  
//   // deserialize user from session
//   passport.deserializeUser(async (email: string, done) => {
//     console.log('Deserializing user with email:', email);
//     try {
//       const result = await query(getUserByEmail, [email]);
//       if (result.rows.length === 0) {
//         return done(null, false);
//       }
//       done(null, result.rows[0]);
//     } catch (error) {
//       done(error, null);
//     }
//   });

// export default passport;
  
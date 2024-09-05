import passport from 'passport';
import User from '../common/types/types';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { query } from '../server/models/dbClient'; // PostgreSQL setup
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } from '../utils/secrets';

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL,
},
  async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: User | false) => void) => {
    try {
      // Check if user exists in the database
      const result = await query('SELECT * FROM users WHERE google_id = $1', [profile.id]);

      if (result.rows.length === 0) {
        // Insert new user if not found
        const email = profile.emails?.[0]?.value ?? ''; // Default to an empty string if email is undefined
        const name = profile.displayName ?? 'Unknown'; // Default to 'Unknown' if displayName is undefined
        const profilePhoto = profile.photos?.[0]?.value ?? ''; // Default to an empty string if photo is undefined
        
        const newUser = await query(
          `INSERT INTO users (google_id, email, name, profile_photo)
           VALUES ($1, $2, $3, $4) RETURNING *`,
          [profile.id, email, name, profilePhoto]
        );
        
        return done(null, newUser.rows[0]);
      }

      return done(null, result.rows[0]);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user: User, done: (err: any, id?: string) => void) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return done(null, null);
    }
    return done(null, result.rows[0]);
  } catch (error) {
    done(error, null);
  }
});

export default passport;

  
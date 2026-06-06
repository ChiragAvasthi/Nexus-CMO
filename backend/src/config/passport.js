import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || 'mock-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock-client-secret',
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists via googleId or email
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

        let user = await prisma.user.findFirst({
          where: {
            OR: [
              { googleId: profile.id },
              { email: email },
            ],
          },
        });

        if (user) {
          // If user exists but doesn't have googleId set (they signed up with email first), link it
          if (!user.googleId) {
            user = await prisma.user.update({
              where: { id: user.id },
              data: { googleId: profile.id },
            });
          }
          return done(null, user);
        }

        // Create new user if they don't exist
        const name = profile.displayName || 'Google User';
        
        user = await prisma.user.create({
          data: {
            email: email || `${profile.id}@google.mock`,
            googleId: profile.id,
            name: name,
            workspaces: {
              create: [{ name: `${name}'s Workspace` }],
            },
          },
        });
        
        user.isNewUser = true;
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;

import { Passport } from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { type Express } from "express";
import { type AppContext } from "./context";

export const applyPassportToExpressApp = (expressApp: Express, ctx: AppContext): void => {
  const passport = new Passport();

  passport.use(
    new JWTStrategy(
      {
        secretOrKey: "not-really-secret-jwt-key",
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
      },

      (jwtPayload: string, done) => {
        ctx.prisma.user
          .findUnique({
            where: {
              id: jwtPayload,
            },
          })
          .then((user) => {
            if (!user) {
              done(null, false);
              return;
            }
            done(null, user);
          })
          .catch((error) => {
            done(error, false);
          });
      }
    )
  );

  expressApp.use((req, res, next) => {
    if (!req.headers.authorization) {
      next();
      return;
    }

    passport.authenticate("jwt", { session: false })(req, res, next);
  });
};

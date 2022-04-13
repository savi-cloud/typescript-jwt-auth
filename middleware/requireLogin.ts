import { Request, Response, NextFunction } from "express";

const requireLogin = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return res.status(401).json("You're not allowed to access this resource");
  }

  return next();
};

export default requireLogin;

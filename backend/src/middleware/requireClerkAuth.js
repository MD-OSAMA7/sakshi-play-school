import { getAuth } from "@clerk/express";

const requireClerkAuth = (req, res, next) => {
  const { isAuthenticated } = getAuth(req);

  if (!isAuthenticated) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  next();
};

export default requireClerkAuth;
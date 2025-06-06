import { Router } from "express";
import { requireAuth, getAuth } from "@clerk/express";

const router = Router();

// Get user profile (requires authentication)
router.get("/profile", requireAuth(), (req, res) => {
  const auth = getAuth(req);

  if (!auth.userId) {
    return res.status(401).json({
      error: true,
      message: "Authentication required",
    });
  }

  // TODO: Implement user profile retrieval
  return res.json({
    message: "User profile endpoint",
    userId: auth.userId,
    data: {},
  });
});

// Update user profile (requires authentication)
router.put("/profile", requireAuth(), (req, res) => {
  const auth = getAuth(req);

  if (!auth.userId) {
    return res.status(401).json({
      error: true,
      message: "Authentication required",
    });
  }

  // TODO: Implement user profile update
  return res.json({
    message: "User profile update endpoint",
    userId: auth.userId,
    data: {},
  });
});

export default router;

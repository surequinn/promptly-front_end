import { Router } from "express";
import { requireAuth, getAuth } from "@clerk/express";

const router = Router();

// Generate prompts endpoint (requires authentication)
router.post("/generate", requireAuth(), (req, res) => {
  const auth = getAuth(req);

  if (!auth.userId) {
    return res.status(401).json({
      error: true,
      message: "Authentication required",
    });
  }

  // TODO: Implement prompt generation logic
  return res.json({
    message: "Prompt generation endpoint",
    userId: auth.userId,
    data: [],
  });
});

// Get user's saved prompts (requires authentication)
router.get("/user", requireAuth(), (req, res) => {
  const auth = getAuth(req);

  if (!auth.userId) {
    return res.status(401).json({
      error: true,
      message: "Authentication required",
    });
  }

  // TODO: Implement user prompts retrieval
  return res.json({
    message: "User prompts endpoint",
    userId: auth.userId,
    data: [],
  });
});

export default router;

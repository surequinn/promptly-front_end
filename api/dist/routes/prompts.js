"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = require("@clerk/express");
const supabase_1 = require("../lib/supabase");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
router.post("/generate", (0, express_2.requireAuth)(), async (req, res) => {
    const auth = (0, express_2.getAuth)(req);
    if (!auth.userId) {
        return res.status(401).json({
            error: true,
            message: "Authentication required",
        });
    }
    try {
        const { category, responseText, promptType = "GENERATED" } = req.body;
        if (!category || !responseText) {
            return res.status(400).json({
                error: true,
                message: "Category and response text are required",
            });
        }
        const { data: user } = await supabase_1.supabase
            .from("users")
            .select("id")
            .eq("clerkUserId", auth.userId)
            .single();
        if (!user) {
            return res.status(404).json({
                error: true,
                message: "User not found",
            });
        }
        const newPrompt = {
            id: (0, uuid_1.v4)(),
            userId: user.id,
            category,
            responseText,
            aiGenerated: promptType === "GENERATED",
            promptType: promptType,
            status: "ACTIVE",
        };
        const { data: savedPrompt, error } = await supabase_1.supabase
            .from("prompts")
            .insert([newPrompt])
            .select()
            .single();
        if (error)
            throw error;
        return res.json({
            message: "Prompt generated and saved successfully",
            userId: auth.userId,
            data: savedPrompt,
        });
    }
    catch (error) {
        console.error("Error generating prompt:", error);
        return res.status(500).json({
            error: true,
            message: "Failed to generate prompt",
        });
    }
});
router.get("/user", (0, express_2.requireAuth)(), async (req, res) => {
    const auth = (0, express_2.getAuth)(req);
    if (!auth.userId) {
        return res.status(401).json({
            error: true,
            message: "Authentication required",
        });
    }
    try {
        const { data: user } = await supabase_1.supabase
            .from("users")
            .select("id")
            .eq("clerkUserId", auth.userId)
            .single();
        if (!user) {
            return res.status(404).json({
                error: true,
                message: "User not found",
            });
        }
        const { data: prompts, error } = await supabase_1.supabase
            .from("prompts")
            .select("*")
            .eq("userId", user.id)
            .eq("status", "ACTIVE")
            .order("createdAt", { ascending: false });
        if (error)
            throw error;
        return res.json({
            message: "User prompts retrieved successfully",
            userId: auth.userId,
            data: prompts || [],
        });
    }
    catch (error) {
        console.error("Error fetching user prompts:", error);
        return res.status(500).json({
            error: true,
            message: "Failed to fetch user prompts",
        });
    }
});
router.put("/:promptId", (0, express_2.requireAuth)(), async (req, res) => {
    const auth = (0, express_2.getAuth)(req);
    const { promptId } = req.params;
    if (!auth.userId) {
        return res.status(401).json({
            error: true,
            message: "Authentication required",
        });
    }
    try {
        const { responseText } = req.body;
        if (!responseText) {
            return res.status(400).json({
                error: true,
                message: "Response text is required",
            });
        }
        const { data: user } = await supabase_1.supabase
            .from("users")
            .select("id")
            .eq("clerkUserId", auth.userId)
            .single();
        if (!user) {
            return res.status(404).json({
                error: true,
                message: "User not found",
            });
        }
        const { data: updatedPrompt, error } = await supabase_1.supabase
            .from("prompts")
            .update({
            responseText,
            promptType: "EDITED",
            updatedAt: new Date().toISOString(),
        })
            .eq("id", promptId)
            .eq("userId", user.id)
            .select()
            .single();
        if (error)
            throw error;
        return res.json({
            message: "Prompt updated successfully",
            userId: auth.userId,
            data: updatedPrompt,
        });
    }
    catch (error) {
        console.error("Error updating prompt:", error);
        return res.status(500).json({
            error: true,
            message: "Failed to update prompt",
        });
    }
});
exports.default = router;
//# sourceMappingURL=prompts.js.map
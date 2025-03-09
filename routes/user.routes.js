import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
    res.send({ title: "Get all users" });
});
userRouter.get("/:id", (req, res) => {
    res.send({ title: "Get user details" });
});
userRouter.post("/", (req, res) => {
    res.send({ title: "Create all users" });
});
userRouter.put("/:id", (req, res) => {
    res.send({ title: "Update user details" });
});
userRouter.delete("/:id", (req, res) => {
    res.send({ title: "Delete user" });
});

export default userRouter;
import { Router, Request, Response } from "express";
import Subscription from "../models/Subscription";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { endpoint, keys } = req.body;

    await Subscription.findOneAndUpdate(
      { userId: user._id },
      { endpoint, keys },
      { upsert: true, new: true }, // yoxdursa yeni subscription əlavə et, varsa update et
    );

    res.status(201).json({ message: "Subscription saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save subscription" });
  }
});

export default router;

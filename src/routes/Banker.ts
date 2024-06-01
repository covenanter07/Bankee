// routes/Banker.ts
import express, { Request, Response } from "express";
import { dataSource } from "../config/datasource";
import { Banker } from "../entities/Banker";

const router = express.Router();

// Query banker data from database with customer relationships
router.get("/bankers", async (_req: Request, res: Response) => {
  try {
    const bankers = await dataSource.getRepository(Banker).find({}); // Get repository from the initialized DataSource

    return res.status(200).json(bankers);
  } catch (error) {
    console.error("Error occurred while querying bankers:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while querying bankers." });
  }
});
router.post("/bankers", async (_req: Request, res: Response) => {
  try {
    const {
      username,
      email,
      password,
      firstname,
      lastname,
      card_number,
      employee_number,
    } = _req.body;

    const banker = Banker.create({
      username,
      email,
      password,
      firstname,
      lastname,
      card_number,
      employee_number,
    });

    await banker.save();

    return res.status(200).json(banker);
  } catch (error) {
    return res.send(error);
  }
});

export default router;

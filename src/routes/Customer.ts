import express, { Request, Response } from "express";
import { dataSource } from "../config/datasource";
import { Customer } from "../entities/Customer";
import { Transaction, TransactionType } from "../entities/Transaction";

const router = express.Router();

router.use(express.json()); // Middleware to parse JSON bodies

// select firstname, balance
router.get("/customer", async (_req: Request, res: Response) => {
  try {
    const customers = await dataSource
      .getRepository(Customer)
      .createQueryBuilder("customer")
      .select(["customer.firstname", "customer.balance"])
      .leftJoinAndSelect("customer.transactions", "transactions")
      .getMany();

    return res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/customer", async (req: Request, res: Response) => {
  try {
    const { username, email, password, firstname, lastname, card_number } =
      req.body;
    const customer = Customer.create({
      username,
      email,
      password,
      firstname,
      lastname,
      card_number,
    });

    await customer.save();
    return res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post(
  "/customer/:customerId/transaction",
  async (req: Request, res: Response) => {
    try {
      const { customerId } = req.params;
      const { type, amount } = req.body;

      const customer = await Customer.findOneBy({ id: parseInt(customerId) });
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      const transaction = Transaction.create({
        type,
        amount,
        customer,
      });

      await transaction.save();

      if (type === TransactionType.DEPOSIT) {
        customer.balance = customer.balance + amount;
      } else if (type === TransactionType.WITHDRAW) {
        customer.balance = customer.balance - amount;
      }

      await customer.save();
      return res.status(201).json(transaction);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.delete("/customer/:customerId", async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;

    const response = await Customer.delete(parseInt(customerId));

    return res.json({ msg: "deleted customer successfully...!" });
  } catch (error) {
    return res.send(error);
  }
});
export default router;

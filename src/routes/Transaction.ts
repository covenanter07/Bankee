import express, {Request, Response} from 'express';
import { Banker } from '../entities/Banker';
import { Customer } from '../entities/Customer';
const router = express.Router();

router.use(express.json()); // Middleware to parse JSON bodies

// Create Query transaction
router.get('/transaction', async (_req, res) => {
    try {
      return res.send('Query all transactions from database')
    } catch (error) {
        return res.send(error)
    }
});

router.put('/banker/:bankId/customer/:customerId', async (req: Request, res: Response)=> {
  try {
    const { bankId, customerId} =req.params;

    //Customer 's transaction
    const customer = await Customer.findOneBy({ id: parseInt(customerId) });
    //Banker create customer 's transaction
    const banker = await Banker.findOneBy({ id: parseInt(bankId) });

    if(!banker || !customer) {
      return res.status(400).json({
        msg: "banker or customer not found..."
      })
    }

    banker.customers = [
      customer
    ]
    await banker.save()

    return res.status(200).json({
      msg: 'Link banker to customer successfully'
    });
  } catch (error) {
    return res.send(error)
  }
})


export default router;
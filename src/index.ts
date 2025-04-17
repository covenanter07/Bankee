import "dotenv/config";
import express, { Application } from "express";
import { dataSource } from "./config/datasource";
import CustomerRoutes from "./routes/Customer";
import BankerRoutes from "./routes/Banker";
import TransactionRoutes from "./routes/Transaction";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.setupRootRoute();
    this.CustomerRoutes();
    this.BankerRoutes();
    this.TransactionRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
  }

  private setupRootRoute(): void {
    this.app.get("/", (req, res) => {
      res.send(`
        <html>
        <head>
          <title>Bankee API</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            h1 {
              color: #4a90e2;
            }
            .endpoint {
              background-color: #f5f5f5;
              padding: 10px;
              margin: 10px 0;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <h1>Welcome to Bankee API</h1>
          <p>This is the API server for Bankee banking application.</p>
          <h2>Available Endpoints:</h2>
          <div class="endpoint">GET /api/customer - Retrieve all customers</div>
          <div class="endpoint">POST /api/customer - Create a new customer</div>
          <div class="endpoint">DELETE /api/customer/:customerId - Delete a customer</div>
          <div class="endpoint">POST /api/customer/:customerId/transaction - Create a transaction</div>
          <div class="endpoint">GET /api/bankers - Retrieve all bankers</div>
          <div class="endpoint">POST /api/bankers - Create a new banker</div>
          <div class="endpoint">GET /api/transaction - Query all transactions</div>
          <div class="endpoint">PUT /api/banker/:bankId/customer/:customerId - Link banker to customer</div>
          <p>For more information, see the API documentation.</p>
        </body>
        </html>
      `);
    });
  }

  private CustomerRoutes(): void {
    this.app.use("/api", CustomerRoutes);
  }

  private BankerRoutes(): void {
    this.app.use("/api", BankerRoutes);
  }
  private TransactionRoutes(): void {
    this.app.use("/api", TransactionRoutes);
  }
}

const port: number = 7338;

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    const app = new App().app;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization:", err);
  });

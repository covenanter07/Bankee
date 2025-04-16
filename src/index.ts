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
    this.CustomerRoutes();
    this.BankerRoutes();
    this.TransactionRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
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

import { DataSource } from "typeorm";
import { config } from "dotenv";

config();

class Database {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      type: "postgres",
      url: process.env.DATABASE_URL, // 使用 DATABASE_URL
      entities: [__dirname + "/../entities/*{.ts,.js}"], // 你的 Entity 路徑
      synchronize: true, // 設為 false 在正式環境
      ssl: { rejectUnauthorized: false }, // Render 需要開啟 SSL
    });
  }

  public async connect(): Promise<void> {
    try {
      await this.dataSource.initialize();
      console.log("✅ PostgreSQL connected successfully!");
    } catch (err) {
      console.error("❌ Not connected to PostgreSQL database:", err);
    }
  }
}

export { Database };


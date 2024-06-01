import { DataSource } from "typeorm";

// Define the interface for database configuration
interface DatabaseConfig {
    type: "postgres"; // You can add other types if needed (e.g., 'mysql', 'mariadb', etc.)
    database: string;
    connection: {
        host: string;
        port: number;
        username: string;
        password: string;
    };
}

abstract class AbstractDatabase {
    protected dataSource: DataSource;

    constructor(protected config: DatabaseConfig) {
        // Initialize DataSource instance with provided configuration
        this.dataSource = new DataSource({
            type: config.type,
            database: config.database,
            host: config.connection.host,
            port: config.connection.port,
            username: config.connection.username,
            password: config.connection.password,
            entities: [__dirname + "/../entities/*{.js,.ts}"], // Add your entities
            synchronize: true, // Set to false in production
        });
    }

    public abstract connect(): Promise<void>; // Remove async modifier
}

class Database extends AbstractDatabase {
    constructor(config: DatabaseConfig) {
        super(config);
    }

    public async connect(): Promise<void> { // Implement async in the concrete method
        try {
            // Initialize the DataSource
            await this.dataSource.initialize();
            console.log("PostgreSQL connected successfully.");
        } catch (err) {
            console.error("Not connected to PostgreSQL database:", err);
        }
    }
}

export { Database, DatabaseConfig };

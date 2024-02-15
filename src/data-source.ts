import path from "node:path"
import { DataSource, DataSourceOptions } from "typeorm"
import "dotenv/config"


const DataSourceConfig = (): DataSourceOptions => {
    const entitiesPath = path.join(__dirname, "entities/*.{ts, js}")
    const migrationsPath = path.join(__dirname, "migrations/*.{ts, js}")

    if (!process.env.DATABASE_URL) {
        throw new Error("Env var DATABASE_URL does not exists")
    }

    return {
        type: "postgres",
        url: process.env.DATABASE_URL,
        synchronize: false,
        logging: true,
        entities: [entitiesPath],
        migrations: [migrationsPath]
    }
}

const AppDataSource = new DataSource(DataSourceConfig())

export { AppDataSource }
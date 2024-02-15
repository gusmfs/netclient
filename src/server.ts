import app from './app'
import "dotenv/config"
import { AppDataSource } from "./data-source"
import swaggerDocs from "./utils/swagger";


AppDataSource.initialize()
    .then(() => {
        console.log("database is running")
        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`)
            swaggerDocs(app)
        })
    })
    .catch((err) => console.log(err))

// Conexión Knex
import dotenv from 'dotenv'

dotenv.config()

export default {
    PORT: process.env.PORT || 8080,
    mongoRemote: {
        cliente: 'mongodb',
        cxnStr: process.env.MONGOOSE_CONNECT
    }
}
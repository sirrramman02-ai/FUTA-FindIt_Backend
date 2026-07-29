import 'dotenv/config'
import { createApp } from './app.js'
import { connectDatabase } from './database.js'
const port = process.env.PORT || 5000
connectDatabase().then(createApp).then((app) => app.listen(port, () => console.log(`FUTA FindIt API running on http://localhost:${port}`))).catch((error) => { console.error('Startup failed:', error.message); process.exit(1) })

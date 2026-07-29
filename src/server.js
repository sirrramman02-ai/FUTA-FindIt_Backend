import 'dotenv/config'
import { createApp } from './app.js'
const port = process.env.PORT || 5000
createApp().then((app) => app.listen(port, () => console.log(`FUTA FindIt API running on http://localhost:${port}`)))

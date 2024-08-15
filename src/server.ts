import express from 'express'
import cors from 'cors'
import { categoryRouter } from './routes/category-routes'
import { productRouter } from './routes/product-routes'
import { saleRouter } from './routes/sale-routes'
import { businessRouter } from './routes/business-routes'
import { authRoutes } from './routes/auth-routes'

const app = express()

app.use(express.json())
app.use(cors())

const PORT = 3333

app.use('/', authRoutes)
app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/sale', saleRouter)
app.use('/business', businessRouter)

app.listen(PORT, () => {
  console.log(`Running in port ${PORT} 🔥`)
})

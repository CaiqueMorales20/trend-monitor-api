import express from 'express'
import cors from 'cors'
import { categoryRouter } from './routes/category-routes'
import { productRouter } from './routes/product-routes'

const app = express()

app.use(express.json())
app.use(cors())

const PORT = 3333

app.use('/category', categoryRouter)
app.use('/product', productRouter)

app.listen(PORT, () => {
  console.log(`Running in port ${PORT}`)
})

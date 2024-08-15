import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface CustomRequest extends Request {
  user?: {
    businessId: number
    // eslint-disable-next-line
    [key: string]: any
  }
}

function authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).send('No token provided')
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY!
    const decoded = jwt.verify(token, secretKey)

    if (typeof decoded === 'object' && 'businessId' in decoded) {
      req.user = decoded as { businessId: number }
      next()
    } else if (typeof decoded === 'object' && 'admin' in decoded) {
      next()
    } else {
      return res.status(401).send('Unauthorized')
    }
  } catch (err) {
    res.status(401).send('Unauthorized')
  }
}

export { authMiddleware }

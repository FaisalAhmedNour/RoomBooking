import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserRequest extends Request {
  user?: any;
}

export const auth = (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'You have no access to this route',
    });
  }
  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'You have no access to this route',
    });
  }
};

export const adminAuth = (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      statusCode: 403,
      message: 'Access denied. Admins only.',
    });
  }
  next();
};

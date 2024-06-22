import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { TUser, userValidationSchema } from './user.interface';
import { userServices } from './user.service';

export const signUp = async (req: Request, res: Response) => {

  const validation = userValidationSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Invalid user data',
        error: validation.error.errors,
      });
    }

  const { name, email, password, phone, address, role }: TUser = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await userServices.createUser({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role, 
    });

    if (user) {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'User registered successfully',
        data: user,
      });
    } else {
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Error registering user',
        error: '',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Error registering user',
      error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userServices.findUserByEmail({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Invalid email or password',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      'secretKey',
      { expiresIn: '1h' },
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User logged in successfully',
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Error logging in',
      error,
    });
  }
};

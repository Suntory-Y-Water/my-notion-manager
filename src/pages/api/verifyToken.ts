import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.auth_token;

  try {
    jwt.verify(token!, process.env.JWT_SECRET!);
    res.status(200).json({ isValid: true });
  } catch (err) {
    res.status(401).json({ isValid: false });
  }
};

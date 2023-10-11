import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const correctEmail = process.env.EMAIL;
  const correctPassword = process.env.PASSWORD;

  if (!correctPassword || !correctEmail) {
    res.status(500).json({ success: false, message: 'server error' });
    return;
  }

  if (email !== correctEmail) {
    return res.status(400).json([
      {
        success: false,
        message: 'Email is different',
      },
    ]);
  }

  const isMatchPassword = await bcrypt.compare(password, correctPassword);
  if (!isMatchPassword) {
    return res.status(400).json([
      {
        success: false,
        message: 'Password is different',
      },
    ]);
  }

  if (isMatchPassword) {
    const JWT_SECRET_KEY = process.env.JWT_SECRET;
    const token = jwt.sign({ email: correctEmail }, JWT_SECRET_KEY!, {
      expiresIn: '1h',
    });

    res.setHeader('Set-Cookie', `auth_token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60}`);
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Different email or password' });
  }
};

// app/api/users/route.ts

import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import initMiddleware from '@/lib/init-middleware';
import User from '@/lib/database/models/user.model';

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['POST'], // Add the HTTP methods you want to allow
  })
);

// POST method handler
export async function post(req: NextApiRequest, res: NextApiResponse) {
  // Run the cors middleware
  await cors(req, res);

  if (req.method === 'POST') {
    const { userId, userName, email, profilePicture } = req.body;

    try {
      let user = await User.findOne({ userId });

      if (!user) {
        user = new User({
          userId,
          userName,
          email,
          profilePicture,
          // Initialize other fields as needed
        });

        await user.save();
      } else {
        user.userName = userName;
        user.email = email;
        user.profilePicture = profilePicture;
        // Update other fields as needed
        await user.save();
      }

      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

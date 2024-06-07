import { NextApiRequest, NextApiResponse } from 'next';
import  connectToDatabase  from "@/lib/database/connection";
import Review from '@/lib/database/models/review.model';

export default async function getReviews(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await connectToDatabase();
      const { productId } = req.query;

      if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' });
      }

      const reviews = await Review.find({ productId });
      return res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}

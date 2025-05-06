export default function handler(req, res) {
    if (req.method === 'POST') {
      const { userId, questionId, answer } = req.body;
      console.log('Received answer:', { userId, questionId, answer });
      res.status(200).json({ message: 'Answer received' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
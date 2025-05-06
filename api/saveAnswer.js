// api/saveAnswer.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { userId, questionId, answer } = req.body;
  
      // For now, just log it to test
      console.log('Received answer:', { userId, questionId, answer });
  
      return res.status(200).json({ message: 'Answer received!' });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }
  
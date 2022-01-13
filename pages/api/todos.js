// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const todos = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { text } = req.body;
    todos.push(text.toUpperCase());
    res.json(text.toUpperCase());
    return;
  }
  res.json({
    todos,
  });
}

import express from 'express';

const app = express();

const PORT: number = Number(process.env.PORT);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
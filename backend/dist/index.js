import express from 'express';
const app = express();
const PORT = Number(process.env.PORT);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map
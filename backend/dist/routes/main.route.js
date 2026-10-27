import express from 'express';
import listRouter from './list.route.js';
const router = express.Router();
router.use('/list', listRouter);
export default router;
//# sourceMappingURL=main.route.js.map
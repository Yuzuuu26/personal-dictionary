import express from 'express';
import { getDefinition, getList, getPage, postDefinition } from '../controllers/list.controller.js';

const router = express.Router();

router.get('/', getPage);
router.get('/all', getList);
router.post('/add', postDefinition);
router.get('/:id', getDefinition);

export default router;
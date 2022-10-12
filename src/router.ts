import { Router } from 'express';
import { body } from 'express-validator';
import { createProduct, deleteProduct, getOneProduct, getProducts } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';
import { inputErrorHandler } from './modules/middleware';

const router = Router();

/**
 * Product
 */
router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.put(
  '/product/:id',
  body('name').isString(),
  inputErrorHandler,
  (req, res) => {
    res.status(200);
    res.json({ message: 'success' })
  }
);
router.post(
  '/product',
  body('name').isString(),
  inputErrorHandler,
  createProduct
);
router.delete('/product/:id', deleteProduct);

/**
 * Updates
 */
router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
router.put(
  '/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
  body('version').optional(),
  inputErrorHandler,
  updateUpdate
);
router.post(
  '/update',
  body('title').isString(),
  body('body').isString(),
  body('productId').exists().isString(),
  inputErrorHandler,
  createUpdate
);
router.delete('/update/:id', deleteUpdate);

/**
 * Update Point
 */
router.get('/updatepoint', () => { });
router.get('/updatepoint/:id', () => { });
router.put(
  '/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  inputErrorHandler,
  (req, res) => {
    res.status(200);
    res.json({ message: 'success' });
  }
);
router.post(
  '/updatepoint',
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  inputErrorHandler,
  (req, res) => {
    res.status(200);
    res.json({ message: 'success' })
  }
);
router.delete('/updatepoint/:id', () => { });

router.use((err, req, res, next) => {
  console.log(err);
  res.json({ message: 'router handler' })
})

export default router;

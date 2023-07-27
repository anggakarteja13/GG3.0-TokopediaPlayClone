import { Router } from 'express';
const productRouter = Router();
import { getProductList, addProduct, getProduct } from '../controllers/product';

productRouter.get('/:videoId', getProductList);
productRouter.get('/item/:productId', getProduct);
productRouter.post('/', addProduct);

export default productRouter;

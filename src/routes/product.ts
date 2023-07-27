import { Router } from 'express';
const productRouter = Router();
import { productList, addProduct } from '../controllers/product';

productRouter.get('/:videoId', productList);
productRouter.post('/', addProduct);

export default productRouter;

import log from '../utils/logger'
import express from 'express'
import validateResource from '../middleware/validateResource';

import { createSesionHandler, refreshAccessTokenHandler } from '../controller/session.controller';
import { createSessionSchema } from '../schema/session.schema';

const router = express.Router();


router.post('/login', validateResource(createSessionSchema), createSesionHandler )


router.post('/refresh', refreshAccessTokenHandler)


export default router

import log from '../utils/logger'
import express from 'express'
import validateResource from '../middleware/validateResource';

import { createUserHandler, getCurrentUserHandler } from '../controller/user.controller';
import { createUserSchema } from '../schema/user.schema';
import requireLogin from '../middleware/requireLogin';

const router = express.Router();

router.post('/create-user', validateResource(createUserSchema), createUserHandler )

router.get('/my-details', requireLogin , getCurrentUserHandler)

export default router

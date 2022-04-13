import log from '../utils/logger'
import express from 'express'

import user from './user.routes'
import session from './session.routes'

const router = express.Router();


router.use('/api/user', user);
router.use('/api/session', session); //login, logout etc. all are related to session


export default router
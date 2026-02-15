import express from 'express'
import { verifyHandler } from '../controllers/verifyController.js'

const router=express.Router()

router.post('/',verifyHandler)

export default router
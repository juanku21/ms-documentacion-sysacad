
import express from 'express'
import { CertificateController } from '../controllers/certificate.controller'

const certifcateRouter = express.Router()

certifcateRouter.post('/pdf', CertificateController.getPDFByStudent)
certifcateRouter.post('/docx', CertificateController.getODTByStudent)

export default certifcateRouter
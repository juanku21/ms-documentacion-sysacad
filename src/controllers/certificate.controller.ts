
import { Request, Response, RequestHandler } from "express"
import { StudentValidator } from "../validators/student.validator"
import { CerficateService } from "../services/certificate.service"


export class CertificateController {

    public static getPDFByStudent : RequestHandler = async (req : Request, res : Response) => {

        const student = req.body 

        if (!StudentValidator.create(student)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {
            const result = await CerficateService.generateRegularCertificatePDF(student)

            if (result === null) {
                throw new Error('El recurso con el ID solicitado no existe')
            }

            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', `inline; filename="certificado_alumno_regular_${req.body.id}.pdf"`)
            
            res.status(200).send(result)

        }
        catch (error : any) {

            if (error.message === 'El recurso con el ID solicitado no existe') {
                res.status(404).json({error: `${error.message}`})
            }
            else{
                res.status(503).json({error: `${error.message}`})
            }

        }
    }

    public static getODTByStudent : RequestHandler = async (req : Request, res : Response) => {

        const student = req.body 

        if (!StudentValidator.create(student)) {
            res.status(400).json({error: 'Los datos enviados son incorrectos'})
        }

        try {
            const result = await CerficateService.generateRegularCertificateDOCX(student)

            if (result === null) {
                throw new Error('El recurso con el ID solicitado no existe')
            }

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            res.setHeader('Content-Disposition', 'attachment; filename=certificado.docx')
            
            res.status(200).send(result)

        }
        catch (error : any) {

            if (error.message === 'El recurso con el ID solicitado no existe') {
                res.status(404).json({error: `${error.message}`})
            }
            else{
                res.status(503).json({error: `${error.message}`})
            }

        }
    }


}
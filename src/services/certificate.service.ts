
import { PDFGenerator } from "../utils/pdf"
import { RegularCertificateInput } from "../types"
import { DOCXGenerator } from "../utils/docx"
import config from "../config/config"

export class CerficateService {

    public static async generateRegularCertificatePDF(id : number) : Promise<Uint8Array | null> {

        try {

            const student = await this.getAlumnoById(id)

            // const studentInput = StudentMapper.fromEntityToCertificateObject(student)

            const certificate = await PDFGenerator.regularCertificate(student)

            return certificate

        } 
        catch (error : any) {
            throw new Error(error.message)
        }

    }

    public static async generateRegularCertificateDOCX(id : number) : Promise<Buffer | null> {

        try {

            const student = await this.getAlumnoById(id)

            // const studentInput = StudentMapper.fromEntityToCertificateObject(student)

            const certificate = await DOCXGenerator.regularCertificate(student)

            return certificate

        } 
        catch (error : any) {
            throw new Error(error.message)
        }

    }

    private static async getAlumnoById(id: number) : Promise<any> {
            
        try{

            const response = await fetch(`${config.URL_ALUMNOS}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok && response.status == 404) {
                throw new Error('El recurso con el ID solicitado no existe')
            }
            else if (!response.ok) {
                throw new Error(`Fallo al solicitar información del Alumno ${id}`)
            }

            const student = await response.json()

            return student

        }
        catch (error : any) {
            throw new Error(error.message)
        }
    }

}
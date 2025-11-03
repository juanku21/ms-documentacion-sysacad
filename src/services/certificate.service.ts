
import { PDFGenerator } from "../utils/pdf"
import { RegularCertificateInput } from "../types"
import { DOCXGenerator } from "../utils/docx"

export class CerficateService {

        public static async generateRegularCertificatePDF(student : RegularCertificateInput) : Promise<Uint8Array | null> {

        try {
            // const studentInput = StudentMapper.fromEntityToCertificateObject(student)

            const certificate = await PDFGenerator.regularCertificate(student)

            return certificate

        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener el certificado solicitado: ${error}`)
        }

    }

    public static async generateRegularCertificateDOCX(student : RegularCertificateInput) : Promise<Buffer | null> {

        try {

            // const studentInput = StudentMapper.fromEntityToCertificateObject(student)

            const certificate = await DOCXGenerator.regularCertificate(student)

            return certificate

        } 
        catch (error : any) {
            throw new Error(`No fue posible obtener el certificado solicitado: ${error}`)
        }

    }

}
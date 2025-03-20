import { env } from '@/env'
import { S3Client } from '@aws-sdk/client-s3'
/*
 O cliente S3 é uma instância de S3Client que é exportada para ser usada em outros módulos.

 Region é automático no cloudfare


*/
export const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${env.CLOUDFARE_ACCONUT_ID}.r2.cloudfarestorage.com`,
  credentials: {
    accessKeyId: env.CLOUDFARE_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFARE_SECRET_ACCESS_KEY,
  },
})

import { env } from '@/env'
import { S3Client } from '@aws-sdk/client-s3'
/*
 O cliente S3 é uma instância de S3Client que é exportada para ser usada em outros módulos.

 Region é automático no cloudflare


*/
export const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
})

import { randomUUID } from 'node:crypto'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import type { InferInsertModel } from 'drizzle-orm'

export async function makeUpload(
  // overrides permite que os campos padrão sejam substituídos pelos valores passados como argumento
  overrides?: Partial<InferInsertModel<typeof schema.uploads>>
) {
  const fileName = `${randomUUID()}.jpg`

  const result = await db
    .insert(schema.uploads)
    .values({
      name: fileName,
      remoteKey: `images/${fileName}`,
      remoteUrl: `https://example.com/${fileName}`,
      ...overrides,
    })
    .returning()

  return result[0]
}

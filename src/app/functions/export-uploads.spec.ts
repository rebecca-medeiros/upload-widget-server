import { randomUUID } from 'node:crypto'
import { resolve } from 'node:path'
import * as upload from '@/infra/storage/upload-file-to-storage'
import { isRight, unwrapEither } from '@/shared/either'
import { makeUpload } from '@/test/factories/make-uploads'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { exportUploads } from './export-uploads'

// spy (monitora) vs stub (implementa/modifica)

describe('export uploads', () => {
  it('should be able to export uploads', async () => {
    // Criando um stub para simular a função de upload
    const uploadStub = vi
      .spyOn(upload, 'uploadFileToStorage')
      .mockImplementationOnce(async () => {
        return {
          key: `${randomUUID()}.csv`, // Simula o nome do arquivo gerado
          url: 'https://example.com/file.csv', // Simula a URL do arquivo
        }
      })

    // Gerando um padrão aleatório para os nomes dos uploads
    const namePattern = randomUUID()

    // Criando uploads de exemplo
    const upload1 = await makeUpload({ name: `${namePattern}.webp` })
    const upload2 = await makeUpload({ name: `${namePattern}.webp` })
    const upload3 = await makeUpload({ name: `${namePattern}.webp` })
    const upload4 = await makeUpload({ name: `${namePattern}.webp` })

    // Chamando a função que exporta os uploads
    const sut = await exportUploads({
      searchQuery: namePattern, // Buscando uploads com o nome que corresponde ao padrão
    })

    // Capturando o stream de dados do CSV gerado pelo stub
    const generatedCSVStream = uploadStub.mock.calls[0][0].contentStream

    // Convertendo o stream de CSV para string
    const csvAsString = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = []

      // Adicionando dados ao buffer quando o stream envia 'data'
      generatedCSVStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      // Quando o stream terminar, concatenamos e transformamos em string
      generatedCSVStream.on('end', () => {
        resolve(Buffer.concat(chunks).toString('utf-8'))
      })

      // Tratando erros do stream
      generatedCSVStream.on('error', err => {
        reject(err)
      })
    })

    // Convertendo a string CSV para um array de arrays
    const csvAsArray = csvAsString
      .trim()
      .split('\n') // Quebra as linhas
      .map(row => row.split(',')) // Quebra as colunas por vírgula

    console.log(csvAsArray) // Mostra o array do CSV para depuração

    // Verificando se o resultado da exportação é correto
    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual({
      reportUrl: 'https://example.com/file.csv', // Verifica a URL gerada
    })

    // Validando se os dados do CSV estão corretos
    expect(csvAsArray).toEqual([
      ['ID', 'Name', 'URL', 'Uploaded at'], // Cabeçalhos
      [upload1.id, upload1.name, upload1.remoteUrl, expect.any(String)], // Dados do primeiro upload
      [upload2.id, upload2.name, upload2.remoteUrl, expect.any(String)], // Dados do segundo upload
      [upload3.id, upload3.name, upload3.remoteUrl, expect.any(String)], // Dados do terceiro upload
      [upload4.id, upload4.name, upload4.remoteUrl, expect.any(String)], // Dados do quarto upload
    ])
  })
})

import { NextApiRequest, NextApiResponse } from 'next'
import { getCollectionData } from '@lib/collection'
import { ICollection } from 'types'

interface ICollectionSearch extends NextApiRequest {
    name: string
}
export type ISearchResponseData = ICollection[]

export default async function handler(req: ICollectionSearch, res: NextApiResponse<ISearchResponseData>) {
    const { name } = req.query
    const collection = await getCollectionData(name)
    res.status(200).json(collection)
}

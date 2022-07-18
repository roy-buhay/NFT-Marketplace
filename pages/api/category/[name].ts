import { NextApiRequest, NextApiResponse } from 'next'
import { getCategoryData } from '@lib/category'

interface ICollectionSearch extends NextApiRequest {
    name: string
}
export type ISearchResponseData = string[]

export default async function handler(req: ICollectionSearch, res: NextApiResponse<ISearchResponseData>) {
    const { name } = req.query
    const collection = await getCategoryData(name)
    res.status(200).json(collection)
}

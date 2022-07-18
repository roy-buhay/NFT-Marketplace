import { NextApiRequest, NextApiResponse } from 'next'
import { getCategoryData } from '@lib/category'

export type ISearchResponseData = string[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<ISearchResponseData>) {
  res.status(200).json(await getCategoryData())
}

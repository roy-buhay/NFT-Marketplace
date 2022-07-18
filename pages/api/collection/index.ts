import { NextApiRequest, NextApiResponse } from 'next'
import { getCollectionData } from '@lib/collection'
import { ICollection } from 'types';

export type ISearchResponseData = ICollection[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<ISearchResponseData>) {
  res.status(200).json(await getCollectionData())
}

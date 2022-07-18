import { NextApiRequest, NextApiResponse } from 'next'
import { getUserData } from '@lib/user'
import { IUser } from 'types'

export type IResponseData = IUser;

export default async function handler(req: NextApiRequest, res: NextApiResponse<IResponseData>) {
  res.status(200).json(await getUserData())
}

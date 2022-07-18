import { NextApiRequest, NextApiResponse } from 'next'
import { getUserData } from '@lib/user'
import { IUser } from 'types'

interface IUserSearch extends NextApiRequest {
    name: string
}
export type ISearchResponseData = IUser

export default async function handler(req: IUserSearch, res: NextApiResponse<ISearchResponseData>) {
    const { address } = req.query
    const user = await getUserData(address)
    res.status(200).json(user)
}

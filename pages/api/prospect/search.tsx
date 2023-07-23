import prisma from '../../../lib/prisma'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const searchInput = (req.query.input).toString()

  // const searchedTags = await prisma.tags.findMany({
  //   where: {
  //     name : {
  //       contains: searchInput
  //     }
  //   }
  // })
  
  // console.log(searchedTags[0].prospectId)
  const data = await prisma.prospects.findMany({
    where: {
      OR: [
        { mail: { contains: searchInput, mode: 'insensitive' } },
        { name: { contains: searchInput, mode: 'insensitive' } },
        { phone: { contains: searchInput } },
        // { tags: { some: { name: { contains: searchInput, mode: 'insensitive' } } } }
        // { id: { contains: searchedTags.prospectId}}
      ]
    },
  })
  // for (let i = 0; i < searchedTags.length; i++) {
  //   const newData = await prisma.prospects.findMany({
  //     where: {
  //       id: {
  //         contains: searchedTags[i].prospectId
  //       }
  //     }
  //   })
  //   console.log(newData)
  // }
  

  if (data.length == 0) {
    return await res.status(400).send({ error: 'No results!' })
  }

  return res.send(data)
}
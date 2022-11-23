import prisma from '../../../lib/prisma'
import validateEmail from 'email-validator'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // get the prospect's email and phone number
  // and trim any new line characters and spaces
  const prospectEmail = req.body.mail.trim().replace(' ', '')
  const prospectPhone = req.body.phone.trim().replace(' ', '')
  
  // if the prospect's email already exists 
  // or is invalid, return an error
  if (await isEmailInUse(prospectEmail)) {
    return await res.status(400).send({ error: 'Email is already in use!' })
  } else if (!validateEmail.validate(prospectEmail)) {
    return await res.status(400).send({ error: 'Invalid email adress!' })
  }
  
  // create an instance of PhoneNumberUtil
  const phoneUtil = require('libphonenumbers').PhoneNumberUtil.getInstance()

  // parse number with RO country code and keep raw input
  const phoneNumber = phoneUtil.parseAndKeepRawInput(prospectPhone, 'RO')

  // if the prospect's phone number already exists 
  // or has invalid format, return an error
  if (await isPhoneInUse(prospectPhone)) {
    return await res.status(400)
      .send({ error: 'Phone number is already in use!' })
  } else if (!phoneUtil.isValidNumber(phoneNumber)) {
    return await res.status(400)
      .send({ error: 'Invalid phone number format!' })
  }

  // insert the new prospect into the database 
  await prisma.prospects.create({ data: {
    name: req.body.name,
    mail: prospectEmail,
    fb: req.body.fb,
    phone: prospectPhone
  } })

  // return a success status
  return res.status(201).json({ success: true })
}

// This function will check if a prospect's email is already in use
async function isEmailInUse(email: string): Promise<boolean> {
  return await prisma.prospects.findFirst({ where: { mail: email } }) !== null
}

// This function will check if a prospect's phone number is already in use
async function isPhoneInUse(phone: string): Promise<boolean> {
  return await prisma.prospects.findFirst({ where: { phone: phone } }) !== null
}

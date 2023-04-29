/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

import { PrismaClient } from '@prisma/client'

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    'cy:doneTesting': async (model) => {
      const prisma = new PrismaClient()
      await prisma[model].deleteMany({ })
      return null
    },
    'db:seedBookings': () => {
      const seed = require('../seeds/bookings/seedBookingsList.ts')
      return null
    },
    'db:seedProspects': () => {
      const seed = require('../seeds/prospects/seedProspectsList.ts')
      return null
    }
  })
}
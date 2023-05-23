import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

// This function will create 10 team members for testing the list of prospects
async function addTeamMembersList() {
    for (let index = 1; index <= 5; ++index) {
      await prisma.team_members.create({ data: {
        name: 'Team Member ' + index,
        mail: 'team_member' + index + '@gmail.com',
        password: 'wasd' + index,
        role: Role.USER, 
      } })
    }
    for (let index = 6; index <= 10; ++index) {
      await prisma.team_members.create({ data: {
        name: 'Team Member ' + index,
        mail: 'admin_member' + index + '@gmail.com',
        password: 'sdwa' + index,
        role: Role.ADMIN,
      } })
    }
  }
  
addTeamMembersList()
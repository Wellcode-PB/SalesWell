import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

// This function will create 10 team members to test
// the list of team members. 
async function addTeamMembersList() {
  // The first 5 are have the role of USER.
  for (let index = 1; index <= 5; ++index) {
    await prisma.team_members.create({ data: {
      name: 'Team Member ' + index,
      mail: 'team_member' + index + '@gmail.com',
      password: 'wasd' + index,
      role: Role.USER, 
      account_state: 'ENABLED',
    } })
  }
  // The second half have the role of ADMIN.
  for (let index = 6; index <= 10; ++index) {
    await prisma.team_members.create({ data: {
      name: 'Team Member ' + index,
      mail: 'admin_member' + index + '@gmail.com',
      password: 'sdwa' + index,
      role: Role.ADMIN,
      account_state: 'ENABLED',
    } })
  }
}
  
addTeamMembersList()
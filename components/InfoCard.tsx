import { Card, CardActionArea, CardContent } from '@mui/material'
import Router from 'next/router'
import React from 'react'

function InfoCard({ userInfo, onClickRoute, idPrefix }) {
  function userRoute() {
    if (onClickRoute == null) {
      return
    } 
    Router.push(onClickRoute + userInfo.id)
  }

  function addElements() {
    const results = []
    for (let i = 2; i < userInfo.length; i++) {
      results.push(<p>{userInfo[i]}</p>)
    }
    return results
  }

  return (
    <CardActionArea onClick={userRoute}>
      <Card  sx={{ width: 'auto', height: 'auto', m: 1}} elevation={5}>
        <CardContent id={idPrefix + userInfo[0]} >
          <h2>{userInfo[1]}</h2>
          {addElements()}
        </CardContent>
      </Card>
    </CardActionArea>
  )
}

export default InfoCard
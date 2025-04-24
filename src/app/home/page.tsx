'use client'


import { HomeContainer } from '@sections/home/HomeContainer'
import { Box } from '@mui/material'
import React from 'react'


const MainPageHome: React.FC = () => (
  <Box
    sx={{
      height: '100vh',
      width: '100vw',
    }}>
    <HomeContainer />
  </Box>
)

export default MainPageHome

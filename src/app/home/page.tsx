'use client'


import { HomePageLayout } from '@/sections/home/HomePageLayout'
import { Box } from '@mui/material'
import React from 'react'


const MainPageHome: React.FC = () => (
  <Box
    sx={{
      height: '100vh',
      width: '100vw',
    }}>
    <HomePageLayout />
  </Box>
)

export default MainPageHome

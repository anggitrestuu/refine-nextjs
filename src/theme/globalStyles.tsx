// @mui
import { GlobalStyles as MUIGlobalStyles } from '@mui/material';

// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const inputGlobalStyles = (
    <MUIGlobalStyles
      styles={{
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
        },
        '#__next': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        img: {
          display: 'block',
          maxWidth: '100%',
        },
        ul: {
          margin: 0,
          padding: 0,
        },
        // // custom scrollbar thin
        // '::-webkit-scrollbar': {
        //   width: 5,
        //   height: 5,
        // },
        // '::-webkit-scrollbar-track': {
        //   background: 'transparent',
        // },
        // '::-webkit-scrollbar-thumb': {
        //   borderRadius: 8,
        //   backgroundColor: 'rgba(0, 0, 0, 0.2)',
        // },
        // '::-webkit-scrollbar-thumb:hover': {
        //   backgroundColor: 'rgba(0, 0, 0, 0.3)',
        // },
        // '::-webkit-scrollbar-thumb:active': {
        //   backgroundColor: 'rgba(0, 0, 0, 0.4)',
        // },
        // '::-webkit-scrollbar-thumb:window-inactive': {
        //   backgroundColor: 'rgba(0, 0, 0, 0.1)',
        // },
        // '::-webkit-scrollbar-corner': {
        //   backgroundColor: 'transparent',
        // },
      }}
    />
  );

  return inputGlobalStyles;
}

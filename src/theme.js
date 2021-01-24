import { createMuiTheme } from '@material-ui/core/styles'; 

export const Theme = createMuiTheme({
    
    typography: {
        allVariants:{
          fontFamily: [
            "'Roboto', sans-serif"
          ]
        },
        // h1: {
        //   fontFamily: [
        //     "'Source Sans Pro', sans-serif"
        //   ].join(','),
        // },
        // h2: {
        //   fontFamily: [
        //     "'Source Sans Pro', sans-serif"
        //   ].join(','),
        //   fontWeight: 700
        // },
        // h3: {
        //   fontFamily: [
        //     "'Source Sans Pro', sans-serif"
        //   ].join(','),
        //   fontWeight: 700
        // },
        // h4: {
        //   fontFamily: [
        //     "'Source Sans Pro', sans-serif"
        //   ].join(','),
        //   fontWeight: 700
        // },
        // h6: {
        //   fontFamily: [
        //     "'Source Sans Pro', sans-serif"
        //   ].join(',')
        // }
    },
    palette: {
      // type: "dark",
      primary: {
          main: '#704cb6',
      },
      secondary: {
          main: '#D270FF'
      },
    },
    
 });
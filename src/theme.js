import { createMuiTheme } from '@material-ui/core/styles'; 

export const Theme = createMuiTheme({
    
    typography: {
        allVariants:{
          fontFamily: [
            "'Roboto', sans-serif"
          ]
        },
    },
    palette: {
      // type: "dark",
      primary: {
          main: '#eb4e23',
      },
      secondary: {
          main: '#D270FF'
      },
    },
    
 });
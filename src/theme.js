import { createMuiTheme } from '@material-ui/core/styles'; 

export const Theme = createMuiTheme({
    
    typography: {
        allVariants:{
          fontFamily: [
            "'Merriweather Sans', sans-serif"
          ]
        },
    },
    toolbarWidth: 165,
    palette: {
      // type: "dark",
      primary: {
          main: '#eb4e23',
      },
      secondary: {
          main: '#23C0EB'
      },
    },
    
 });
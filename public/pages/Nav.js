"use client"
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { 
    Box, 
    AppBar, 
    Typography,
    Button,
    Toolbar,
    Grid,
    Container,
    Link
} from "@mui/material";
let buttonTheme = createTheme({
});
//the color is blue, and split into blue.main, blue.dark, blue.light
buttonTheme = createTheme(buttonTheme, {
    palette: {
        buttonBlue: buttonTheme.palette.augmentColor({
        color: {
          main: "#0000ff",
        },
        name: "buttonBlue",
      }),
    },
  });

  export default function Nav() {
    return (
        <ThemeProvider theme={buttonTheme}>
            <AppBar sx={{width:"100vw", bgcolor:"#9facc2"}}>
                <Toolbar>
                        <Link underline="none" href="/" style={{flexGrow: 1, paddingLeft: 10}} color="white">
                            <Typography variant="h6" >
                                GenCard AI  
                            </Typography>
                        </Link>
                        <SignedOut>
                            <Button sx={{bgcolor:"buttonBlue.light"}} variant="contained" color="secondary" href="/sign-in">Login</Button>
                            <Button sx={{ ml: 2, bgcolor:"buttonBlue.light"}} variant="contained" color="secondary" href="/sign-up">Sign Up</Button>
                        </SignedOut>
                    <SignedIn>
                    <UserButton/>
                    </SignedIn>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
  }
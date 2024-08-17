'use client'

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import getStripe from "@/utils/get-stripe";
import { useRouter } from "next/navigation"
import { blue } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
    Box, 
    AppBar, 
    Typography,
    Button,
    Toolbar,
    Grid,
    Container,
} from "@mui/material";

let buttonTheme = createTheme({
});
//the color is blue, and split into blue.main, blue.dark, blue.light
buttonTheme = createTheme(buttonTheme, {
    palette: {
        buttonBlue: buttonTheme.palette.augmentColor({
        color: {
          main: '#0000ff',
        },
        name: 'buttonBlue',
      }),
    },
  });

export default function Home() {
    const { isLoaded, isSignedIn, user } = useUser()
    const router = useRouter()

    const handleSubmit = async () => {
        const checkoutSession = await fetch('/api/checkout_sessions', {
          method: 'POST',
          headers: { origin: 'http://localhost:3000' },
        })
        const checkoutSessionJson = await checkoutSession.json()
      
        const stripe = await getStripe()
        const {error} = await stripe.redirectToCheckout({
          sessionId: checkoutSessionJson.id,
        })
      
        if (error) {
          console.warn(error.message)
        } 
    }

    return(
        <Box>
            <ThemeProvider theme={buttonTheme}>
            <AppBar sx={{width:"100vw", bgcolor:"#9facc2"}}>
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1, paddingLeft: 10}}>
                        GenCard AI  
                    </Typography>
                        <SignedOut>
                            <Button sx={{bgcolor:"buttonBlue.light"}} variant="contained" color="secondary" href="/sign-in">Login</Button>
                            <Button sx={{ ml: 2, bgcolor:"buttonBlue.light"}} variant="contained" color="secondary" href="/sign-up">Sign Up</Button>
                        </SignedOut>
                    <SignedIn>
                    <UserButton/>
                    </SignedIn>
                </Toolbar>
            </AppBar>
            <Box sx={{my: 6, textAlign: 'center', width:'100vw'}}  display="flex" alignContent={'center'} alignItems="center" bgcolor="#f0f0f0" height = "100vh">
                <Grid container spacing = {4} justifyContent="space-between"> 
                        <Grid item xs = {12} md = {6} 
                            bgcolor="#f0f0f0" 
                            display="flex" 
                            alignContent={'center'} 
                            alignItems="center" 
                            justifyContent={'center'} 
                            flexDirection = 'column'
                        >
                            <Typography variant="h2" component="h1" gutterBottom>
                                Welcome to GenCard AI
                            </Typography>
                            <Typography variant="h5" component="h2" gutterBottom>
                                The easiest way to create flashcards from your text.
                            </Typography>
                            <Button variant="contained" color="primary" sx={{mt: 2, bgcolor:"buttonBlue.light"}} href="/generate">
                                Get Started
                            </Button>
                            <Button variant="contained" color="primary" sx={{mt: 2, bgcolor:"buttonBlue.light"}} href="/flashcards">
                                My flashcards
                            </Button>
                        </Grid>
                    <Grid item xs = {12} md = {6}>
                        <Box height = {"100vh"}>
                            <img 
                            src={"/images/notecard cartoon.jpg"}
                            width="100%"
                            height="100%"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{my: 6, textAlign: 'center'}}>
                <Typography variant="h4" gutterBottom>Features</Typography>
                <Grid container spacing={4}>
                    <Grid item xs = {12} md = {4}>
                        <Box
                            sx={{
                                P: 3,
                                border: '2px solid',
                                borderColor: 'grey.300',
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="h6">easy text input</Typography>
                            <Typography>
                                {' '}
                                blah blah lbah
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs = {12} md = {4}>
                        <Box
                            sx={{
                                P: 3,
                                border: '10px solid',
                                borderColor: 'grey.300',
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="h6">easy text input</Typography>
                            <Typography>
                                {' '}
                                blah blah lbah
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs = {12} md = {4}>
                        <Box
                            sx={{
                                P: 3,
                                border: '10px solid',
                                borderColor: 'grey.300',
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="h6">easy text input</Typography>
                            <Typography>
                                {' '}
                                blah blah lbah
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{my: 6, textAlign: 'center'}}>
                <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs = {12} md = {4}>
                    <Box
                            sx={{
                                P: 3,
                                border: '2px solid',
                                borderColor: 'grey.300',
                                borderRadius: 2,
                            }}
                        >
                        <Typography variant="h6">Free Tier</Typography>
                        <Typography>
                            {' '}
                            blah blah lbah
                        </Typography>
                        <Button variant="contained" sx={{bgcolor:"buttonBlue.light"}}
                            onClick={() => {
                                if (!user) {
                                    router.push('/sign-up')
                                } else {
                                    router.push('/generate')
                                }
                            }}
                        >
                            Start
                        </Button>
                    </Box>
                    </Grid>
                    <Grid  item xs = {12} md = {4}>
                    <Box
                            sx={{
                                P: 3,
                                border: '2px solid',
                                borderColor: 'grey.300',
                                borderRadius: 2,
                            }}
                        >
                        <Typography variant="h6">Basic Tier</Typography>
                        <Typography>
                            {' '}
                            blah blah lbah
                        </Typography>
                        <Button variant="contained" sx={{bgcolor:"buttonBlue.light"}}
                            onClick={() => {
                                handleSubmit()
                            }}
                        >
                            Buy
                        </Button>
                    </Box>
                    </Grid>
                    <Grid item xs = {12} md = {4}>
                    <Box
                            sx={{
                                P: 3,
                                border: '2px solid',
                                borderColor: 'grey.300',
                                borderRadius: 2,
                            }}
                        >
                        <Typography variant="h6">Pro Tier</Typography>
                        <Typography>
                            {' '}
                            blah blah lbah
                        </Typography>
                        <Button variant="contained" sx={{bgcolor:"buttonBlue.light"}}
                            onClick={() => {
                                handleSubmit()
                            }}
                        >
                            Buy
                        </Button>
                    </Box>
                    </Grid>
                </Grid>
            </Box>
            </ThemeProvider>
        </Box>
    )
}
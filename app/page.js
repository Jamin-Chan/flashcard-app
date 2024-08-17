'use client'

import { SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import getStripe from "@/utils/get-stripe";
import { 
    Box, 
    AppBar, 
    Typography,
    Button,
    Toolbar,
    Grid,
    Container,
} from "@mui/material";




export default function Home() {
    // const handleSubmit = async () => {
    //     const checkoutSession = await fetch('/api/checkout_sessions', {
    //       method: 'POST',
    //       headers: { origin: 'http://localhost:3000' },
    //     })
    //     const checkoutSessionJson = await checkoutSession.json()
      
    //     const stripe = await getStripe()
    //     const {error} = await stripe.redirectToCheckout({
    //       sessionId: checkoutSessionJson.id,
    //     })
      
    //     if (error) {
    //       console.warn(error.message)
    //     } 
    // }

    return(
        <Box>
            <AppBar sx={{width:"100vw", bgcolor:"#9facc2"}}>
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1, paddingLeft: 10}}>
                        GenCard AI
                    </Typography>
                        <SignedOut>
                            <Button variant="contained" color="secondary" href="/sign-in">Login</Button>
                            <Button sx={{ ml: 2}} variant="contained" color="secondary" href="/sign-up">Sign Up</Button>
                        </SignedOut>
                    <SignedIn>
                    <UserButton/>
                    </SignedIn>
                </Toolbar>
            </AppBar>
            <Box sx={{my: 6, textAlign: 'center', width:'100vw'}}  display="flex" alignContent={'center'} alignItems="center" bgcolor="#000000" height = "100vh">
                <Grid container direction="row" justifyContent="space-evenly">
                    <Grid item xs = {12} md = {2} bgcolor="#f0f0f0">
                        <Typography variant="h2" component="h1" gutterBottom>
                            Welcome to GenCard AI
                        </Typography>
                        <Typography variant="h5" component="h2" gutterBottom>
                            The easiest way to create flashcards from your text.
                        </Typography>
                        <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/generate">
                            Get Started
                        </Button>
                        <Button variant="outlined" color="primary" sx={{mt: 2}} href="/flashcards">
                            My flashcards
                        </Button>
                    </Grid>
                    <Grid item xs = {12} md = {2}>
                        <Box>
                            <img 
                            src={"/images/jamin upsidedown swing.jpg"}
                            width={"100%"}
                            height={"100%"}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{my: 6, textAlign: 'center'}}>
                <Typography variant="h4" gutterBottom>Features</Typography>
                <Grid container spacing={4}>
                    <Grid item xs = {12} md = {4}>
                        <Typography variant="h6">easy text input</Typography>
                        <Typography>
                            {' '}
                            blah blah lbah
                        </Typography>
                    </Grid>
                    <Grid item xs = {12} md = {4}>
                        <Typography variant="h6">easy text input</Typography>
                        <Typography>
                            {' '}
                            blah blah lbah
                        </Typography>
                    </Grid>
                    <Grid item xs = {12} md = {4}>
                        <Typography variant="h6">easy text input</Typography>
                        <Typography>
                            {' '}
                            blah blah lbah
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{my: 6, textAlign: 'center'}}>
                <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs = {12} md = {4}>
                        <Typography variant="h6">easy text input</Typography>
                        <Typography>
                            {' '}
                            blah blah lbah
                        </Typography>
                    </Grid>
                    <Grid item xs = {12} md = {4}>
                        <Typography variant="h6">easy text input</Typography>
                        <Typography>
                            {' '}
                            blah blah lbah
                        </Typography>
                    </Grid>
                    <Grid item xs = {12} md = {4}>
                        <Typography variant="h6">easy text input</Typography>
                        <Typography>
                            {' '}
                            blah blah lbah
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
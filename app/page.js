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
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                    Flashcard SaaS
                    </Typography>
                    <SignedOut>
                        <Button>Login</Button>
                        <Button>Sign Up</Button>
                    </SignedOut>
                    <SignedIn>
                    <UserButton/>
                    </SignedIn>
                </Toolbar>
            </AppBar>
            <Box sx={{textAlign: 'center', my: 4}}>
                <Typography variant="h2" component="h1" gutterBottom>
                Welcome to Flashcard SaaS
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                The easiest way to create flashcards from your text.
                </Typography>
                <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/generate">
                Get Started
                </Button>
                <Button variant="outlined" color="primary" sx={{mt: 2}}>
                Learn More
                </Button>
            </Box>
            <Box sx={{my: 6}}>
                <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
                <Grid contained spacing={4}>
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
                <Grid contained spacing={4} justifyContent="center">
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
        </Container>
    )
}
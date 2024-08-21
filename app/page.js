"use client"

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Nav from "../public/pages/Nav.js"
import getStripe from "@/utils/get-stripe";
import Image from "next/image"
import { useRouter } from "next/navigation"
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
          main: "#0000ff",
        },
        name: "buttonBlue",
      }),
    },
  });

export default function Home() {
    const { isLoaded, isSignedIn, user } = useUser()
    const router = useRouter()

    const handleSubmit = async () => {
        const checkoutSession = await fetch("/api/checkout_sessions", {
          method: "POST",
          headers: { origin: "http://localhost:3000" },
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
        <Box bgcolor="#f0f0f0">
            <ThemeProvider theme={buttonTheme}>
            <Nav/>
            <Box sx={{my: 6, textAlign: "center", width:"100vw"}}  display="flex" alignContent={"center"} alignItems="center" bgcolor="#f0f0f0" height = "100vh">
                <Grid container spacing = {4} justifyContent="space-between"> 
                        <Grid item xs = {12} md = {6} 
                            bgcolor="#f0f0f0" 
                            display="flex" 
                            alignContent={"center"} 
                            alignItems="center" 
                            justifyContent={"center"} 
                            flexDirection = "column"

                        >
                            <Typography variant="h2" component="h1" gutterBottom>
                                Welcome to GenCard AI
                            </Typography>
                            <Typography variant="h5" component="h2" style={{ wordWrap: "break-word", width: "75%"}} gutterBottom>
                            Unlock the power of smart studying with GenCard, 
                            the ultimate AI-powered flashcard generator designed to transform the way you learn. 
                            Whether you are a student prepping for exams, a professional enhancing your skills, or just someone hungry for knowledge, 
                            GenCard is here to make studying more efficient, personalized, and fun.
                            </Typography>
                            <Box display="flex" flexDirection = "row" >
                                <Button variant="contained" color="primary" sx={{margin: 2, bgcolor:"buttonBlue.light" }} href="/generate">
                                    Get Started
                                </Button>
                                <Button variant="contained" color="primary" sx={{margin: 2, bgcolor:"buttonBlue.light"}} href="/flashcards">
                                    My flashcards
                                </Button>
                            </Box>
                        </Grid>
                    <Grid item xs = {12} md = {6}>
                        <Box height = {"100vh"}
                            display="flex" 
                            alignContent={"center"} 
                            alignItems="center" 
                            justifyContent={"center"} 
                        >
                            <img
                            src={"/images/notebook cartoon transparent.png"}
                            width="75%"
                            height="75%"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{height: "600px", textAlign: "center", display: "flex", alignItems: "center", flexDirection: "column"}} >
                <Typography variant="h4" gutterBottom>Features</Typography>
                <Grid container spacing={4} sx={{display: "flex", textAlign: "center", justifyContent: "center"}} >
                    <Grid item xs = {12} md = {3}>
                        <Box
                            sx={{
                                P: 3,
                                border: "2px solid",
                                borderColor: "grey.300",
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="h6">Easy Topic Help</Typography>
                            <Typography>
                                {" "}
                                Got a topic you need to study? Just provide the topic and let the app do the rest!
                                The flashcard generator will create 10 flashcards with a question on the front and the answer on the back.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs = {12} md = {3}>
                        <Box
                            sx={{
                                P: 3,
                                border: "2px solid",
                                borderColor: "grey.300",
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="h6">Easy Text Input</Typography>
                            <Typography>
                                {" "}
                                Our flashcard generator is easy to use. Simply click Get Started, type whatever you want, and click Generate Flashcards and you are done!
                                In the future, we plan on adding more options for generating flashcards to improve accessibility.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs = {12} md = {3}>
                        <Box
                            sx={{
                                P: 3,
                                border: "2px solid",
                                borderColor: "grey.300",
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="h6">Saves Flashcard History</Typography>
                            <Typography>
                                {" "}
                                Want to save and check out your previous sets of flashcards? After generating a set, click Save. You can click My Flashcards and find all the sets you have created!
                                Note: If you want see your history, you must create and use an account to save the flashcard sets.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{height: "600px", textAlign: "center", display: "flex", alignItems: "center", flexDirection: "column"}}>
                <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
                <Grid container spacing={4} sx={{display: "flex", textAlign: "center", justifyContent: "center"}} >
                    <Grid item xs = {12} md = {3}>
                        <Box
                            sx={{
                                P: 3,
                                border: "2px solid",
                                borderColor: "grey.300",
                                borderRadius: 2,
                            }}
                        >
                        <Typography variant="h6">Free Tier</Typography>
                        <Typography>
                            {" "}
                            easy text filler
                        </Typography>
                        <Button variant="contained" sx={{bgcolor:"buttonBlue.light"}}
                            onClick={() => {
                                if (!user) {
                                    router.push("/sign-up")
                                } else {
                                    router.push("/generate")
                                }
                            }}
                        >
                            Start
                        </Button>
                    </Box>
                    </Grid>
                    <Grid  item xs = {12} md = {3}>
                        <Box
                            sx={{
                                P: 3,
                                border: "2px solid",
                                borderColor: "grey.300",
                                borderRadius: 2,
                            }}
                        >
                        <Typography variant="h6">Basic Tier</Typography>
                        <Typography>
                            {" "}
                            easy text filler
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
                    <Grid item xs = {12} md = {3}>
                        <Box
                            sx={{
                                P: 3,
                                border: "2px solid",
                                borderColor: "grey.300",
                                borderRadius: 2,
                            }}
                        >
                        <Typography variant="h6">Pro Tier</Typography>
                        <Typography>
                            {" "}
                            easy text filler
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
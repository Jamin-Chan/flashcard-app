"use client"

import Nav from "../../public/pages/Nav.js"
import { isLoaded, isSignedIn, useUser, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { useState, useEffect } from "react"
import { Container, Grid, Card, CardActionArea, Typography, CardContent, Box, AppBar, Toolbar, Button } from "@mui/material"
import { useSearchParams } from "next/navigation"
import { db } from "@/firebase"
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore"



export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState({})
  
    const searchParams = useSearchParams()
    const search = searchParams.get("id")
    
    useEffect(() => {
        async function getFlashcard() {
          if (!search || !user) return
      
          const docRef = doc(collection(doc(collection(db, "users"), user.id), "flashcardSets"), search)
          const docSnap = await getDoc(docRef)
          const docData = docSnap.data().flashcards

          const flashcards = []

          docData.forEach((doc) => {
            flashcards.push({  ...doc })
          })
          setFlashcards(flashcards)
        }
        getFlashcard()
    }, [search, user])

    const handleCardClick = (id) => {
      setFlipped((prev) => ({
        ...prev,
        [id]: !prev[id],
      }))
    }

    if(!isLoaded || !isSignedIn) {
      return<></>
    }

    return (
        <Container maxWidth="md">
        <Nav/>
          <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                    Flashcard SaaS
                    </Typography>
                    <SignedOut>
                        <Button color="secondary" href="/sign-in">Login</Button>
                        <Button color="secondary" href="/sign-up">Sign Up</Button>
                    </SignedOut>
                    <SignedIn>
                    <UserButton/>
                    </SignedIn>
                </Toolbar>
            </AppBar>
          <Box>
          <Button color="secondary" href="/generate">Generate Flashcards</Button>
            <Typography variant="h2" component="h1" gutterBottom>
                Flashcard Set: {search}
            </Typography>
            <Button color="secondary" href="/generate">Generate More</Button>
            <Button color="secondary" href="/flashcards">Back</Button>
          </Box>
          <Grid container spacing={3} sx={{ mt: 4 }}>
          {flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardActionArea
                                onClick={() => {
                                    handleCardClick(index)
                                }}
                            >
                                <CardContent>
                                    <Box sx={{
                                        perpective: "1000px", 
                                        "&> div":{
                                            transition: "transform 0.6s",
                                            transformStyle: "preserve-3d",
                                            position: "relative",
                                            width: "100%", 
                                            height: "200px",
                                            transform: flipped[index]
                                                ? "rotateY(180deg)"
                                                : "rotateY(0deg)",
                                            },
                                        "&> div > div":{
                                            position: "absolute",
                                            width: "100%", 
                                            height: "100%",
                                            backfaceVisibility: "hidden",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: 2,
                                            boxSizing: "border-box",
                                            },
                                        "&> div > div:nth-of-type(2)":{
                                            transform: "rotateY(180deg)",
                                            },
                                        }}
                                    
                                    >
                                        <div>
                                            <div>
                                                <Typography variant="h6"></Typography>
                                                <Typography>{flashcard.front}</Typography>
                                            </div>
                                            <div>
                                                <Typography variant="h6" sx={{ mt: 2 }}></Typography>
                                                <Typography>{flashcard.back}</Typography>
                                            </div>
                                        </div>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        </Grid>
                    ))}
          </Grid>
        </Container>
      )
  }
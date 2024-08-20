"use client"

import Nav from "../../public/pages/Nav.js"
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { 
  Container, 
  Grid, 
  Card, 
  CardActionArea, 
  Typography, 
  CardContent,
  Box, 
  AppBar,
  Button,
  Toolbar
} from "@mui/material"
import { useState, useEffect } from "react"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"



export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()
  
    useEffect(() => {
        async function getFlashcards() {
          if (!user) {
            return
          } else {
            const docRef = doc(collection(db, "users"), user.id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
              const collections = docSnap.data().flashcardSets || []
              setFlashcards(collections)
            } else {
              await setDoc(docRef, { flashcards: [] })
            }
          }
        }
        getFlashcards()
    }, [user])

    const handleCardClick = (id) => {
      router.push(`/flashcard?id=${id}`)
    }

    const handleBack = () => {
      router.push("/")
    }
    return (
      <Container maxWidth="md">
        <Nav/>
        <Typography variant="h2" style={{flexGrow: 1, paddingLeft: 10 }}>
            Your FlashCard Sets
        </Typography>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {flashcard.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" color="primary" onClick={handleBack}>
                    back
                    </Button>
                </Box>
        
      </Container>
    )
  }
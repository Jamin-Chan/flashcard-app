'use client'

import { useState } from 'react'
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { db } from '@/firebase'
import { collection, doc, getDoc, setDoc, writeBatch } from "firebase/firestore"
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  Box,
  Dialog,
  Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  CardContent,
  CardActionArea
} from '@mui/material'


export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [text, setText] = useState('')
    const [flipped, setFlipped] = useState([])
    const [flashcards, setFlashcards] = useState([])
    const [setName, setSetName] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const handleOpenDialog = () => setDialogOpen(true)
    const handleCloseDialog = () => setDialogOpen(false)
    const router = useRouter()

    const saveFlashcards = async () => {
        if (!setName) {
          alert('Please enter a name for your flashcard set.')
          return
        }

        try {
            const userDocRef = doc(collection(db, 'users'), user.id)
            const userDocSnap = await getDoc(userDocRef)
        
            const batch = writeBatch(db)
        
            if (userDocSnap.exists()) {
              const userData = userDocSnap.data()
              const updatedSets = [...(userData.flashcardSets || []), { name: setName }]
              batch.update(userDocRef, { flashcardSets: updatedSets })
            } else {
              batch.set(userDocRef, { flashcardSets: [{ name: setName }] })
            }
        
            const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)
            batch.set(setDocRef, { flashcards })
        
            await batch.commit()
      
          alert('Flashcards saved successfully!')
          handleCloseDialog()
          setSetName('')
          router.push('/flashcards')
        } catch (error) {
          console.error('Error saving flashcards:', error)
          alert('An error occurred while saving flashcards. Please try again.')
        }
    }

    const handleSubmit = async () => {
        if (!text.trim()) {
        alert('Please enter some text to generate flashcards.')
        return
        }
    
        try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            body: text,
        })
    
        if (!response.ok) {
            throw new Error('Failed to generate flashcards')
        }
    
        const data = await response.json()
        setFlashcards(data)
        } catch (error) {
        console.error('Error generating flashcards:', error)
        alert('An error occurred while generating flashcards. Please try again.')
        }
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
          ...prev,
          [id]: !prev[id],
        }))
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                Generate Flashcards
                </Typography>
                <TextField
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    label="Enter text"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
                 <form action="/upload" method="POST" enctype="multipart/form-data">
                    <input type="file" name="fileUpload" required/>
                    <button type="submit">Upload</button>
                </form>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth
                >
                Generate Flashcards
                </Button>
                {flashcards.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                    Generated Flashcards
                    </Typography>
                    <Grid container spacing={2}>
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
                                        perpective: '1000px', 
                                        '&> div':{
                                            transition: 'transform 0.6s',
                                            transformStyle: 'preserve-3d',
                                            position: 'relative',
                                            width: '100%', 
                                            height: '200px',
                                            transform: flipped[index]
                                                ? 'rotateY(180deg)'
                                                : 'rotateY(0deg)',
                                            },
                                        '&> div > div':{
                                            position: 'absolute',
                                            width: '100%', 
                                            height: '100%',
                                            backfaceVisibility: 'hidden',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: 2,
                                            boxSizing: 'border-box',
                                            },
                                        '&> div > div:nth-of-type(2)':{
                                            transform: 'rotateY(180deg)',
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
                </Box>
                )}
                {flashcards.length > 0 && (
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                    Save Flashcards
                    </Button>
                </Box>
                )}
                <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                    <DialogTitle>Save Flashcard Set</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        Please enter a name for your flashcard set.
                        </DialogContentText>
                        <TextField
                        autoFocus
                        margin="dense"
                        label="Set Name"
                        type="text"
                        fullWidth
                        value={setName}
                        onChange={(e) => setSetName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={saveFlashcards} color="primary">
                        Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    )
}
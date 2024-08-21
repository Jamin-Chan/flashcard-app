'use client'

import Nav from "../../public/pages/Nav.js"
import Input from './../../public/pages/Input';
import { useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { db } from '@/firebase';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import { collection, doc, getDoc, setDoc, writeBatch } from "firebase/firestore";
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

    const handleSubmit = async ({ activeTab, file, text, youtubeLink }) => {
        let extractedText = text;

        if (activeTab === 'pdf' && file) {
            extractedText = await extractTextFromPDF(file);
        }

        console.log(extractedText)
        if (!extractedText.trim()) {
        alert('Please enter some text to generate flashcards.')
        return
        }
    
        try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            body: extractedText,
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

    const extractTextFromPDF = async (file) => {
        const fileReader = new FileReader();
    
        // Create a promise that resolves when the file is read
        const arrayBuffer = await new Promise((resolve, reject) => {
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
            fileReader.readAsArrayBuffer(file);
        });

        
    
        // Load the PDF document
        const pdf = await pdfjsLib.getDocument(new Uint8Array(arrayBuffer)).promise;
    
        let text = '';
        // Extract text from each page
        for (let i = 0; i < pdf.numPages; i++) {
            const page = await pdf.getPage(i + 1);
            const content = await page.getTextContent();
            const pageText = content.items.map(item => item.str).join(' ');
            text += pageText + '\n';
        }
    
        return text;
    };

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
          ...prev,
          [id]: !prev[id],
        }))
    }

    const handleBack = () => {
        router.push("/")
    }

    return (
        <Container maxWidth="md">
            <Box>
                <Nav/>    
            </Box>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                Generate Flashcards
                </Typography>
                {/* <TextField
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    label="Enter text"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{ mb: 2 }}
                /> */}
                 <Input onSubmit={handleSubmit} />
                {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth
                >
                Generate Flashcards
                </Button> */}
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
                <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" color="primary" onClick={handleBack}>
                    back
                    </Button>
                </Box>
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
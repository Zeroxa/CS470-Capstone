import API from '../../../API_Interface/API_Interface';
import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

function FlashCard() {
    const { quizID } = useParams();
    const [cards, setCards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isQuestion, setIsQuestion] = useState(true);

    useEffect(() => {
        const fetchQuizzes = async () => {
            const api = new API();
            try {
                const response = await api.getQuestionsForQuiz(quizID);
                if (response.data && response.data.length > 0) {
                    setCards(shuffleArray(response.data));
                } else {
                    console.log('No quizzes found');
                }
            } catch (error) {
                console.error('Failed to fetch quizzes:', error);
            }
        };

        fetchQuizzes();
    }, [quizID]);

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handlePrev = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentCardIndex < cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        }
    };

    const flipCard = () => {
        setIsQuestion(!isQuestion);
    };

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', textAlign: 'center', mt: 4 }}>
            {cards.length > 0 && (
                <Card variant="outlined" sx={{ mb: 2, padding: 3 }}>
                    <CardContent sx={{ textAlign: 'center', border: 0 }}>
                        <Typography variant="h4" sx={{ fontSize: 24, mb: 2 }}>
                            {isQuestion ? 'Question' : 'Answer'}:
                        </Typography>
                        <Typography sx={{ fontSize: 20 }}> {/* Increased font size */}
                            {isQuestion ? cards[currentCardIndex].question : cards[currentCardIndex].answer}
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 2 }}>
                        <Button onClick={handlePrev} disabled={currentCardIndex === 0}
                                sx={{
                                    border: 0,
                                    color:'white',
                                    backgroundColor:'#535C91',
                                    '&:hover':{
                                        backgroundColor:'#404E7C'
                                    }
                                }}
                        >
                            Previous
                        </Button>
                        <Button onClick={flipCard}
                                sx={{
                                    border: 0,
                                    mr: 2,
                                    color:'white',
                                    backgroundColor:'#535C91',
                                    '&:hover':{
                                        backgroundColor:'#404E7C'
                                    }
                                }}
                        >
                            Flip
                        </Button>
                        <Button onClick={handleNext} disabled={currentCardIndex === cards.length - 1}
                                sx={{
                                    border: 0,
                                    color:'white',
                                    backgroundColor:'#535C91',
                                    '&:hover':{
                                        backgroundColor:'#404E7C'
                                    }
                                }}
                        >
                            Next
                        </Button>
                    </Box>
                </Card>
            )}
            {cards.length === 0 && <Typography variant="h6" sx={{ fontSize: 18 }}>No cards available for this quiz.</Typography>}
        </Box>
    );
}

export default FlashCard;

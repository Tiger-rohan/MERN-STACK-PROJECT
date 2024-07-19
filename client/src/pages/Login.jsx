import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const { data: responseData } = await axios.post('/login', { email, password });
            if (responseData.error) {
                toast.error(responseData.error);
            } else {
                // Check user role and navigate accordingly
                const { role } = responseData; // Assuming responseData contains the user object with role
                setData({});
                if (role === 'admin') {
                    navigate('/admin');
                } else if (role === 'user') {
                    navigate('/user');
                } else {
                    navigate('/dashboard'); // Fallback if role is unrecognized
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <Container maxWidth="sm">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={loginUser}>
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </form>
                    <Box mt={2}>
                        <Typography variant="body2">
                            Don't have an account? <Link to="/register">Register here</Link>
                        </Typography>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
}
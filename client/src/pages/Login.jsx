import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Card, CardContent } from '@mui/material';


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
        <Container maxWidth="sm"> {/* Increased width */}
            <Card sx={{ mt: 8, boxShadow: 3 }}>
                <CardContent>
                    <Box 
                        component="form" 
                        onSubmit={loginUser} 
                        sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <Typography variant="h4" component="h1" gutterBottom>
                            Login
                        </Typography>
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            fullWidth
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </Box>
                    <Box mt={2}>
                        <Typography variant="body2">
                            Don't have an account? <Link to="/register">Register here</Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

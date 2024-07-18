import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../actions/authAction';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, error, user } = useSelector(state => state.user);

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (isAuthenticated) {
            if (user.role === 'admin') {
                navigate('/admin');
            } else if (user.role === 'user') {
                navigate('/user');
            } else {
                navigate('/dashboard');
            }
        }

        if (error) {
            toast.error(error);
        }
    }, [isAuthenticated, error, user, navigate]);

    const login = (e) => {
        e.preventDefault();
        dispatch(loginUser(data));
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
                    <form onSubmit={login}>
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

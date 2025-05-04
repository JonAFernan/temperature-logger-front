import {
    Avatar,
    Container,
    Paper,
    Typography,
    Box,
    TextField,
    Button,
} from '@mui/material';

const Login = () => {
    const sendLogin = console.log(1234535);
    return (
        <Container maxWidth="md">
            <Paper
                elevation={10}
                sx={{
                    marginTop: 8,
                    padding: 2,
                    textAlign: 'center',
                }}
            >
                <Avatar
                    sx={{
                        mx: 'auto',
                        bgcolor: 'red',
                        mb: 1,
                    }}
                ></Avatar>
                <Typography component="h1" variant="h4">
                    Sing in
                </Typography>
                <Box
                    component="form"
                    onSubmit={sendLogin}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        placeholder="Username"
                        fullWidth
                        required
                        autoFocus
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        placeholder="Password"
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 1 }}
                    >
                        <strong>Sing in</strong>
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;

/*const Login = () => {
    return HOLA;
};

export default Login;*/

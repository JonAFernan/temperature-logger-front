import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                bgcolor: 'primary.main',
                p: 2,
                textAlign: 'center',
            }}
        >
            <Typography variant="body1" color="white" padding={2}>
                <strong>© 2025 Creado por Jon Ander Fernández</strong>
            </Typography>
        </Box>
    );
};

export default Footer;

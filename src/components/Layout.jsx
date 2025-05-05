import Header from './Header';
import Footer from './Footer';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh', // Asegura que el layout ocupa toda la pantalla
            }}
        >
            <Header />
            <Box sx={{ flexGrow: 1 }}>
                {' '}
                {/* Empuja el Footer hacia abajo */}
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;

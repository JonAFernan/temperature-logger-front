import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { logout } from '../lib/aux-functions.js';

const LogoutButton = () => {
    const navigate = useNavigate();

    return (
        <Button
            variant="text"
            color="white"
            onClick={() => logout(navigate)}
            sx={{
                mb: 1,
                fontSize: { xs: '0.75rem', sm: '1rem' },
            }}
        >
            Cerrar sesión
        </Button>
    );
};

export default LogoutButton;

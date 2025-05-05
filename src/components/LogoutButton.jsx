import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const LogoutButton = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('jwt');
        navigate('/user/login');
    };

    return (
        <Button
            variant="text"
            color="white"
            onClick={logout}
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

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
            variant="contained"
            color="primary"
            onClick={logout}
            sx={{ marginTop: 2 }}
        >
            Cerrar sesión
        </Button>
    );
};

export default LogoutButton;

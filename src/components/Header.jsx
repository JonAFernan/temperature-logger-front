import {
    AppBar,
    Toolbar,
    Avatar,
    IconButton,
    Typography,
    Box,
} from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { getUserRole } from '../lib/aux-functions';
const Header = () => {
    const navigate = useNavigate();
    const role = getUserRole();
    return (
        <AppBar position="static" color="primary">
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'flex-start',
                    }}
                >
                    <IconButton color="inherit" onClick={() => navigate('/')}>
                        <HomeIcon
                            sx={{
                                fontSize: {
                                    xs: '2rem',
                                    sm: '2.5rem',
                                },
                            }}
                        />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            flex: 1,
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}
                    >
                        Data-logger
                    </Typography>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            sx={{
                                bgcolor:
                                    role === 'admin' ? '#ab003c' : '#76ff03',
                                width: { xs: 36, sm: 42 },
                                height: { xs: 36, sm: 42 },
                                mt: 2,
                            }}
                        >
                            {role === 'admin' ? 'A' : 'B'}
                        </Avatar>
                        <LogoutButton />
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
export default Header;

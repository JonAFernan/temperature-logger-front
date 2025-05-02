import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export function HomeButton() {
    return (
        <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            component={Link}
            to="/"
        >
            HOME
        </Button>
    );
}

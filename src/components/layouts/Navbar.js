import React from 'react';
// Bootstrap
import { AppBar, Toolbar, Typography, MenuListTypeMap, MenuItem } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
//Router
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));

    const logout = () => {
        dispatch({
            type: 'LOGOUT',
            payload: null,
        });
        navigate('/')
    };

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link className='text-light' to="/">
                            Home
                        </Link>
                    </Typography>

                    {!user && <>
                        <MenuItem key="login">
                            <Typography textAlign="center">
                                <Link className='text-light' to="/login">
                                    Log in
                                </Link>
                            </Typography>
                        </MenuItem>
                        <MenuItem key="register">
                            <Typography textAlign="center">
                                <Link className='text-light' to="/register">
                                    Register
                                </Link>
                            </Typography>
                        </MenuItem>
                    </>}
                    {user && <>
                        <MenuItem key="logout" onClick={logout} >
                            <Typography textAlign="center">
                                Log out
                            </Typography>
                        </MenuItem> 
                    </>}

                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}

export default Navbar
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People'; // Example icon for Pacientes
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'; // Example icon for Médicos
import EventIcon from '@mui/icons-material/Event'; // Example icon for Agendamentos
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import MedicationIcon from '@mui/icons-material/Medication';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 240;

function Layout({ children }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem button component={RouterLink} to="/">
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Início" />
                </ListItem>
                {/* Add links based on user roles */}
                {/* Example: Pacientes */}
                {user?.roles?.some(role => ['ADMIN', 'RECEPCIONISTA'].includes(role.authority)) && (
                    <ListItem button component={RouterLink} to="/pacientes">
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary="Pacientes" />
                    </ListItem>
                )}
                
                 {/* Example: Agendamentos */}
                 {user?.roles?.some(role => ['ADMIN', 'RECEPCIONISTA', 'MEDICO'].includes(role.authority)) && (
                    <ListItem button component={RouterLink} to="/agendamentos">
                        <ListItemIcon><EventIcon /></ListItemIcon>
                        <ListItemText primary="Agendamentos" />
                    </ListItem>
                )}
                {user?.roles?.some(role => ['ADMIN', 'RECEPCIONISTA', 'MEDICO'].includes(role.authority)) && (
                    <ListItem button component={RouterLink} to="/consultas">
                        <ListItemIcon><MonitorHeartIcon /></ListItemIcon>
                        <ListItemText primary="Consultas" />
                    </ListItem>
                )}
               
                
            </List>
            <Divider />
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, p: 2 }}>
                Cadastros do Sistema
            </Typography>
            {/* Outras configurações */}
            <list>
                {/* Exemplo: Médicos, Enfermeiros, Funcionários */}
                {user?.roles?.some(role => ['ADMIN'].includes(role.authority)) && (
                    <ListItem button component={RouterLink} to="/medicos">
                        <ListItemIcon><MedicalServicesIcon /></ListItemIcon>
                        <ListItemText primary="Médicos" />
                    </ListItem>
                )}
                {user?.roles?.some(role => ['ADMIN', 'RECEPCIONISTA'].includes(role.authority)) && (
                    <ListItem button component={RouterLink} to="/enfermeiros">
                        <ListItemIcon><MedicationIcon /></ListItemIcon>
                        <ListItemText primary="Enfermeiros" />
                    </ListItem>
                )}
                {user?.roles?.some(role => ['ADMIN', 'RECEPCIONISTA'].includes(role.authority)) && (
                    <ListItem button component={RouterLink} to="/especialidades">
                        <ListItemIcon><AddToQueueIcon /></ListItemIcon>
                        <ListItemText primary="Especialidades" />
                    </ListItem>
                )}
                {user?.roles?.some(role => ['ADMIN', 'RECEPCIONISTA'].includes(role.authority)) && (
                    <ListItem button component={RouterLink} to="/recepcionistas">
                        <ListItemIcon><ContactPhoneIcon /></ListItemIcon>
                        <ListItemText primary="Recepcionistas" />
                    </ListItem>
                )}
               
            </list>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{ 
                    zIndex: (theme) => theme.zIndex.drawer + 1 
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }} // Only show on small screens
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        SGHBC-XP
                    </Typography>
                    {user && (
                        <Typography variant="subtitle1" sx={{ mr: 2 }}>
                            Olá, {user.username}
                        </Typography>
                    )}
                    <Button color="inherit" onClick={handleLogout}>Sair</Button>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* Temporary Drawer for mobile */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                {/* Permanent Drawer for desktop */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar /> {/* Necessary to offset content below AppBar */}
                {children}
            </Box>
        </Box>
    );
}

export default Layout;


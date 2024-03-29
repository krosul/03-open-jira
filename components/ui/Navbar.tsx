import {useContext} from 'react';

import {AppBar, IconButton, Link, Toolbar, Typography} from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import {UIContext} from '../../context/ui/UIContext';
import NextLink from 'next/link';
export const Navbar = () => {
  const {openSideMenu} = useContext(UIContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* <IconButton onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton> */}
        <NextLink href="/" passHref legacyBehavior>
          <Link underline="none" color="white">
            <Typography variant="h6">OpenJira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};

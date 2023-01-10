import { useContext } from "react";

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/Inbox";
import EmailIcon from "@mui/icons-material/Email";
import { UIContext } from "../../context/ui";
const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Drafts"];

export const Sidebar = () => {
  const { sideMenuOpen,closeSideMenu } = useContext(UIContext);
  return (
    <Drawer
      anchor="left"
      open={sideMenuOpen}
      onClose={closeSideMenu}
    >
      <Box sx={{ width: 250 }}>
        <Box
          sx={{
            padding: "5px 10px",
          }}
        >
          <Typography variant="h4">Menu</Typography>
        </Box>
        <List>
          {menuItems.map((data, index) => (
            <ListItemButton key={data}>
              <ListItemIcon>
                {index % 2 ? <InboxIcon /> : <EmailIcon />}
              </ListItemIcon>
              <ListItemText primary={data} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

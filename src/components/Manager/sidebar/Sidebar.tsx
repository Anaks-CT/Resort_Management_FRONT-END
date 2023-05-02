import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { AiOutlineMenu } from "react-icons/ai";

type Anchor = "top" | "left" | "bottom" | "right";
type props = {
  sideBarElems: {_id: string, name: string, onClick: (resortId: string, resortName: string) => void }[],
}
export default function Sidebar({sideBarElems}: props) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      color={'white'}
      // bgcolor={"black"}
      className="h-full border-r bg-black"
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="flex flex-col divide-y gap-4">
      <div className="flex justify-center text-3xl mt-5 tracking-wider">TRINITY</div>
      {/* <Divider className="bg-white mt-3"/> */}

      <div className="px-3">
      <List className="" >
        {sideBarElems.map((text, index) => (
          <ListItem className={`hover:bg-slate-500 ${text._id === "Dashboard" && "mb-10"}`} key={text._id} disablePadding>
            <ListItemButton onClick={()=>text.onClick(text._id, text.name)}>
              <ListItemText className={``}  primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </div>
      </div>
      <Divider />

    </Box>
  );

  return (
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
          <AiOutlineMenu className="top-[19px] fixed z-20 left-12 text-xl md:text-3xl md:right-5" />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

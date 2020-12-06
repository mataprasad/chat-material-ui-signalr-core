import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Badge from '@material-ui/core/Badge';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { initSignalR } from './ChatHub';

import './App.css';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    "&:hover": {
      backgroundColor: "transparent"
    },
  },
  title: {
    flexGrow: 1,
  },
  tabLabel: {
    minWidth: "unset"
  },
  tabPanelBox: {
    paddingTop: "50px",
    // display: "flex",
    maxHeight: `calc(100vh - 70px)`,
    minHeight: `calc(100vh - 70px)`,
    overflow: "scroll"
  },
  textInputShift: {
    width: `calc(100% - ${drawerWidth - 100}px)`,
  },
  messageFormContainer: {
    height: `calc(60px)`,
    padding: "10px !important;"
  },
  messageForm: {
    display: 'flex',
    width: '100%',
    flexDirection: "row",
  },
  textInput: {
    padding: "10px 10px",
    width: `calc(100% - 100px)`,
    outline: "none",
    border: "none",
    borderRadius: "5px",
    marginRight: "5px",
    boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)"
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: "50px",
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <h1>{children}</h1>
      )}
    </div>
  );
}

const tabList = [
  { "name": "Name1", "value": 1 },
  { "name": "Name2", "value": 2 },
  { "name": "Name3", "value": 3 },
];

export default function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const preventDefault = (event) => event.preventDefault();

  useEffect(() => {
    initSignalR();
  }, []);

  const handleChange = (event, newValue) => {
    if (value == newValue && value > 0) {
      setAnchorEl(event.currentTarget);
      console.log("open menu");
    }
    setValue(newValue);
  };

  const isDesktop = false;
  const [drawerOpen, setDrawerOpen] = React.useState((isDesktop ? true : false));
  const [open, setOpen] = React.useState((isDesktop ? drawerOpen : false));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
    setOpen((isDesktop ? true : false));
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setOpen((isDesktop ? false : false));
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className={classes.root}>
      {/* <div><h2>hello world chat</h2></div> */}
      <CssBaseline />
      <AppBar position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })} >
        <Toolbar>
          <IconButton left
            disableRipple={true}
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
            color="inherit" >
            <PeopleAltIcon /> 100+
          </IconButton>
          <Tabs value={value} onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="simple tabs example">
            <Tab className={classes.tabLabel} color="secondary" label={<Badge
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              color="secondary" overlap="circle" badgeContent="2">Indian Chat</Badge>} {...a11yProps(0)} >
            </Tab>
            {tabList.map((item, index) => {
              return <Tab className={classes.tabLabel} label={item.name} {...a11yProps(item.value)} />
            })}
          </Tabs>
        </Toolbar>
      </AppBar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Close</MenuItem>
      </Menu>
      <Drawer
        className={classes.drawer}
        variant={(isDesktop ? 'persistent' : null)}
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={[classes.drawerHeader, "MuiAppBar-colorPrimary", "msg-wrapper"].join(" ")}>
          <IconButton disableRipple={true} onClick={handleDrawerClose}
            edge="start"
            className={clsx(classes.menuButton)}
            color="inherit" >
            <PeopleAltIcon />
            &nbsp;Online 100+
          </IconButton>
          <IconButton color="inherit" onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List id="users-list" className={classes.messageArea}>
          <ListItem key={-1}>
            <input placeholder="100 online." className={classes.textInput} style={{ width: "100%" }} type="text" />
          </ListItem>
          <Divider />
          {
            [...Array(20)].map((_, i) => {
              return (
                <>
                  <ListItem key={i}>
                    <ListItemText align="left" primary="AAAAAAAAAAAAAAAAAA"></ListItemText>
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="comments">
                        <CommentIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </>)
            })
          }
        </List>
      </Drawer>
      <CssBaseline />
      <TabPanel
        className={clsx(classes.content, classes.tabPanelBox, {
          [classes.contentShift]: open,
        })} value={value} index={0}>
        <List className={classes.messageArea}>
          <ListItem key="1">
            <ListItemText secondary="Mata" align="left" primary="Hey man, What's up ?Hey man, What's up ?Hey man, What's up ?Hey man, What's up ?Hey man, What's up ?">
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <CommentIcon color="primary" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          {
            [...Array(10)].map((_, i) => {
              return (
                <>
                  <ListItem key="2">
                    <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                  </ListItem>
                  <Divider />
                </>
              );
            })
          }
          <ListItem key="3">
            <ListItemText align="left" secondary="Mata" primary="Cool. i am good, let's catch up!"></ListItemText>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </List>
      </TabPanel>


      {tabList.map((item, index) => {
        return <TabPanel className={clsx(classes.content, classes.tabPanelBox, {
          [classes.contentShift]: open,
        })} value={value} index={item.value}>
          {item.name}
        </TabPanel>
      })}
      <form className={clsx(classes.content, classes.messageFormContainer, "send-form", {
        [classes.contentShift]: open,
      })} noValidate autoComplete="off">
        <div className={classes.messageForm}>
          <input
            className={clsx(classes.textInput, "textInput_input", {
              [classes.textInputShift]: open,
            })}
            type="text" />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
          />
        </div>
      </form>
    </div>
  )
}

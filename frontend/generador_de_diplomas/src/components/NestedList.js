import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
// Icons
import SchoolIcon from '@material-ui/icons/School';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ListIcon from '@material-ui/icons/List';
import PostAddIcon from '@material-ui/icons/PostAdd';
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList() {
  const classes = useStyles();
  const [OpenInstitution, setOpenInstitution] = React.useState(true);
  const [OpenStamp, setOpenStamp] = React.useState(true);
  const [OpenProduct, setOpenProduct] = React.useState(true);

  const handleClickInstitution = () => {
    setOpenInstitution(!OpenInstitution);
  };

  const handleClickStamp = () => {
    setOpenStamp(!OpenStamp);
  };

  const handleClickProduct = () => {
    setOpenProduct(!OpenProduct);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      
      <Link to='/component-api'>
        <ListItem button>
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary="Generar Diplomas" />
        </ListItem>
      </Link>
      
      <ListItem button onClick={handleClickInstitution}>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Institucion" />
        {OpenInstitution ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={OpenInstitution} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Crear" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Listar" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClickStamp}>
        <ListItemIcon>
          <BeenhereIcon />
        </ListItemIcon>
        <ListItemText primary="Sello" />
        {OpenStamp ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={OpenStamp} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Crear avales" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Listar" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClickProduct}>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Producto" />
        {OpenProduct ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={OpenProduct} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Crear firmas" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Listar" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}

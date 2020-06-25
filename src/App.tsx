import React from 'react';

import logo from './logo.jpg';
import { useGlobalState, useSetGlobaleState } from './Store';

import {
  Grid,
  Typography,
  createMuiTheme,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

const App = () => {
  const [state, setState] = [useGlobalState(), useSetGlobaleState()];
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [`${event.target.name}`]: event.target.checked });
  };
  const handleSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState({ ...state, set: event.target.value || 'apple' });
  };
  return (
    <Card className="App">
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="300"
          image={logo}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Xmoji
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            You can open the Emoji picker tab with shortcut <code>Ctrl + Win(Command) + Space</code>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <FormControlLabel
          control={<Checkbox checked={state.darkMode} name="darkMode" color="primary" onChange={handleCheckbox} />}
          label="Dark Mode"
        />{' '}
        <FormControlLabel
          control={<Checkbox checked={state.startup} name="startup" color="primary" onChange={handleCheckbox} />}
          label="Run in startup"
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Set</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" onChange={handleSelect} value={state.set}>
            <MenuItem value={'apple'}>Apple</MenuItem>
            <MenuItem value={'google'}>Google</MenuItem>
            <MenuItem value={'twitter'}>Twitter</MenuItem>
            <MenuItem value={'facebook'}>Facebook</MenuItem>
          </Select>
        </FormControl>
      </CardActions>
    </Card>
  );
};

export default App;

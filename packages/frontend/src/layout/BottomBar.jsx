import Grid from "@material-ui/core/Grid";
import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { StateContext } from "../StateProvider";

import {BottomNavigation} from '@material-ui/core';
import {BottomNavigationAction} from '@material-ui/core';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

export default function BottomBar() {
    return(
        <Grid item xs={12}>
            <Grid container justify="center">
                <Grid item xs={6}>
                    <BottomNavigation
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        showLabels
                        className="bg-danger"
                    >
                        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
                    </BottomNavigation>
                </Grid>
            </Grid>
        </Grid>
        
        
    )
}


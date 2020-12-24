import React, {Component} from "react";
import {Grid} from "@material-ui/core";
import classes from './Main.module.css';
import Sudoku from "../Sudoku/Sudoku";
import Description from "../Description/Description";

class Main extends Component {
	render () {
		return (
			<div className={classes.Main}>
				<Grid
					container
					direction={"row"}
					justify="space-around"
				>
					<Grid item xs={12} md={7}>
						<Description/>
					</Grid>
					<Grid item xs={12} md={5}>
						<Sudoku/>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default Main;
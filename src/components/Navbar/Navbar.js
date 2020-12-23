import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	appBar: {
		position: "static",
		backgroundColor: '#04b4e0',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	menuTitle: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		textAlign: 'right',
		fontSize: '30px',
		fontWeight: 600,
	},
}));

const Navbar = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Sudoku Solver
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Navbar;
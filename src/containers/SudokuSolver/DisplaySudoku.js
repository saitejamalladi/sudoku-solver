import React from "react";
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";
import classes from "./SudokuSolver.module.css";

const DisplaySudoku = (props) => {
	if(props.grid) {
		return (
			<Grid item>
				<TableContainer component={Paper} className={classes.SudokuBoard}>
					<Table>
						<TableBody>
							{props.grid.map((row, rowIndex) => (
								<TableRow key={rowIndex}>
									{row.map((cell, cellIndex) => (
										<TableCell
											key={cellIndex}
											align="center"
											className={
												props.lockedBlocks[rowIndex][cellIndex]
													? classes.LockedCell
													: classes.UnlockedCell} >
											{cell ? cell: ' '}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		)
	}
	return null;
};

export default DisplaySudoku;
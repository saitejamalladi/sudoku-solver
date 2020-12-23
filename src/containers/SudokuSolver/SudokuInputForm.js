import React, {Component} from 'react';
import {Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";
import classes from "./SudokuSolver.module.css";
import {isSafe} from "../../shared/utility";

class SudokuInputForm extends Component {
	state = {
		grid: [],
		errorRow: null,
		errorCol: null
	}
	componentDidMount() {
		this.initInputGrid();
	}

	initInputGrid = () => {
		let grid = [];
		// for(let row = 1; row <= 1 ; row++ ) {
		// 	let currentRow = [];
		// 	for(let col = 1; col<= 9; col ++) {
		// 		currentRow.push(col);
		// 	}
		// 	grid.push(currentRow);
		// }
		for(let row = 1; row <= 9 ; row++ ) {
			let currentRow = [];
			for(let col = 1; col<= 9; col ++) {
				currentRow.push('');
			}
			grid.push(currentRow);
		}
		this.setState({grid})
	}

	handleChange = (event, row, col) => {
		this.setState({
			errorRow: null,
			errorCol: null
		})
		let num = event.target.value;
		let grid = this.state.grid;
		if(num >= 1 && num <= 9)  {
			if(isSafe(grid, row, col, num)) {
				grid[row][col] = Number(num);
				this.setState({grid: grid});
			} else {
				this.setState({
					errorRow: row,
					errorCol: col
				})
			}
		} else if(num === ''){
			grid[row][col] = num;
			this.setState({grid: grid});
		}
	}
	handleSubmit = (event) => {
		event.preventDefault();
		this.props.initHandler(this.state.grid);
	}
	render () {
		return (
			<div className={classes.SudokuInputForm}>
				<h1>
					Sudoku Solver
				</h1>
				{(this.state.errorRow || this.state.errorCol)
					? <p style={{color: 'red'}}>Entered number may not be a proper entry</p>
					: null}
				<Grid container spacing={2} justify={"space-around"} >
					<Grid item xs={12} sm={6}>
						<form onSubmit={this.handleSubmit}>
							<Button variant={"contained"} type={"submit"} color={"primary"}>Solve</Button>
							<TableContainer component={Paper} className={classes.SudokuBoard}>
								<Table>
									<TableBody>
										{this.state.grid.map((row, rowIndex) => (
											<TableRow key={rowIndex}>
												{row.map((col, colIndex) => (
													<TableCell
														key={rowIndex+" "+colIndex}
														align="center"
														className={
															(this.state.errorRow === rowIndex
																&& this.state.errorCol === colIndex)
																? classes.ErrorBox : ""}
													>
														<input
															className={classes.Input}
															value={this.state.grid[rowIndex][colIndex]}
															onChange={(event) =>
																this.handleChange(event, rowIndex, colIndex)}
														/>
													</TableCell>
												))}
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</form>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default SudokuInputForm;
import React, {Component} from 'react';
import {LinearProgress, Grid} from '@material-ui/core';
import classes from './SudokuSolver.module.css';
import DisplaySudoku from "./DisplaySudoku";
import {solveSudoku} from '../../shared/utility';

class SudokuSolver extends Component {
	state = {
		loading: false,
		error: false,
		solved: false,
		size: 9,
		solvedGrid: []
	}
	componentDidMount() {
		this.handleSolveClick();
	}

	handleSolveClick = () => {
		this.setState({loading: true, error: false, solved: false, solvedGrid: null});
		let grid = [];
		this.props.grid.forEach(row => {
			let currentRow = [];
			row.forEach(cell =>  {
				currentRow.push(cell);
			});
			grid.push(currentRow);
		})
		if (solveSudoku(grid, 0, 0, this.state.size)) {
			this.setState({
				loading: false,
				solved: true,
				solvedGrid: grid
			})
		} else {
			this.setState({
				error: "No Solution exists",
				loading: false,
				solvedGrid: null
			})
		}
	};

	render () {
		return (
			<div className={classes.SudokuSolver}>
				<h1>
					Sudoku Solver
				</h1>
				{this.state.error ? <p style={{color: 'red'}}>{this.state.error}</p>: null }
				{this.state.loading ? <LinearProgress /> : null}
				<Grid container justify={"space-around"} spacing={4}>
					<DisplaySudoku grid={this.props.grid} lockedBlocks={this.props.lockedBlocks}/>
					<DisplaySudoku grid={this.state.solvedGrid} lockedBlocks={this.props.lockedBlocks}/>
				</Grid>
			</div>
		);
	}
}
export default SudokuSolver;
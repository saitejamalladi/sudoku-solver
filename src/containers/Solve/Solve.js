import React, {Component} from 'react';
import classes from './Solve.module.css';
import {solveSudoku} from '../../shared/utility';
import {Backdrop, Button, Fade, Modal} from "@material-ui/core";

class Solve extends Component {
	state = {
		error: false,
		solved: false,
		size: 9,
		solvedGrid: [],
		locked: []
	}
	componentDidMount() {
		this.lockCells();
		setTimeout(this.handleSolve, 1000);
	}
	lockCells = () => {
		let locked = [];
		this.props.grid.forEach(row => {
			let currentRow = [];
			row.forEach(col => {
				if(col) {
					currentRow.push(true);
				} else {
					currentRow.push(false);
				}
			})
			locked.push(currentRow);
		})
		this.setState({
			locked: locked
		})
	}

	handleSolve = () => {
		this.setState({
			error: null,
			solved: false
		});
		let grid = this.props.grid;
		if (solveSudoku(grid, 0, 0, 9)) {
			this.setState({
				solved: true,
				solvedGrid: grid
			})
		} else {
			this.setState({
				error: "No Solution exists",
				solved: true,
				solvedGrid: []
			})
		}
	};
	getClassName = (row, col) => {
		let clxList = [];
		clxList.push(classes.Cell);
		if(row%3 === 0) clxList.push(classes.Top);
		if(col%3 === 0) clxList.push(classes.Left);
		if(row === 8) clxList.push(classes.Bottom);
		if(col === 8) clxList.push(classes.Right);
		if(this.state.errorRow === row && this.state.errorCol === col) clxList.push(classes.Alert);
		if(this.state.locked[row][col]) clxList.push(classes.Locked);
		return clxList.join(" ");
	}


	render () {
		return (
			<div className={classes.Solve}>
				<div>
					<Button variant={"contained"} color={"primary"} onClick={this.props.reset}>Solve New Puzzle</Button>
				</div>
				<h3>
					Here we go!!!!
				</h3>
				{this.state.error ? <p style={{color: 'red'}}>{this.state.error}</p>: null }
				<div>
					<table>
					{
						this.state.solvedGrid.map((row, rowIndex) => (
							<tr key={rowIndex}>
								{row.map((col, colIndex) => (
									<td
										key={rowIndex+"-"+colIndex}
										onChange={(e) => this.handleChange(e, rowIndex, colIndex)}
										className={this.getClassName(rowIndex, colIndex)}
									>
										{col}
									</td>
								))}
								<br/>
							</tr>
						))
					}
					</table>
					<Modal
						aria-labelledby="transition-modal-title"
						aria-describedby="transition-modal-description"
						className={classes.Modal}
						open={!this.state.solved}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500,
						}}
					>
						<Fade in={!this.state.solved}>
							<div className={classes.Confirmation}>
								<h2>Loading.....</h2>
							</div>
						</Fade>
					</Modal>
				</div>
			</div>
		);
	}
}
export default Solve;
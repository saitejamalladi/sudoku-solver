import React, {Component} from "react";
import {Backdrop, Button, Modal} from "@material-ui/core";
import classes from './InputGrid.module.css';
import {isSafe} from "../../shared/utility";

class InputGrid extends Component {
	state = {
		grid: [],
		showConfirmation: false,
		errorRow: null,
		errorCol: null
	}
	componentDidMount() {
		this.initGrid();
	}

	initGrid = () => {
		let grid = [];
		for(let row = 0; row < 9; row++ ) {
			let currentRow = [];
			for(let col = 0; col < 9; col++ ) {
				currentRow.push('');
			}
			grid.push(currentRow);
		}
		grid.forEach((row, rowIndex) => {
			row.forEach((cell, cellIndex) => {
				if(Math.floor(Math.random() * 4) === 0) {
					let num = Math.floor(Math.random() * 9 + 1);
					if(isSafe(grid, rowIndex, cellIndex, num)) {
						grid[rowIndex][cellIndex] = num;
					}
				}
			})
		})
		this.setState({
			grid: grid
		})
	}
	handleChange = (event, row, col) => {
		this.setState({
			errorRow: null,
			errorCol: null
		})
		let num = Number(event.target.value);
		let grid = this.state.grid;
		if(num >= 1 && num <= 9)  {
			if(isSafe(grid, row, col, num)) {
				grid[row][col] = num;
				this.setState({grid: grid});
			} else {
				this.setState({
					errorRow: row,
					errorCol: col
				})
			}
		} else if(num === 0){
			grid[row][col] = '';
			this.setState({grid: grid});
		}
	}
	getClassName = (row, col) => {
		let clxList = [];
		if(row%3 === 0) clxList.push(classes.Top);
		if(col%3 === 0) clxList.push(classes.Left);
		if(row === 8) clxList.push(classes.Bottom);
		if(col === 8) clxList.push(classes.Right);
		if(this.state.errorRow === row && this.state.errorCol === col) clxList.push(classes.Alert);
		if(this.state.grid[row][col]) clxList.push(classes.Locked);
		return clxList.join(" ");
	}
	handleReset = () => {
		this.initGrid();
	}
	handleModal = (value) => {
		this.setState({
			showConfirmation: value
		})
	}
	handleSolve = (grid) => {
		this.props.solve(grid);
	}
	render() {
		return (
			<div className={classes.InputGrid}>
				<h3>
					Enter the numbers and click Submit to solve the sudoku
				</h3>
				{(this.state.errorRow || this.state.errorCol)
					? <p style={{color: 'red'}}>Given number may not be a proper entry</p>
					: null}
				{
					this.state.grid.map((row, rowIndex) => (
						<div>
							{row.map((col, colIndex) => (
								<input
									key={rowIndex+"-"+colIndex}
									type={"text"}
									value={col}
									onChange={(e) => this.handleChange(e, rowIndex, colIndex)}
									className={this.getClassName(rowIndex, colIndex)}
								/>
							))}
							<br/>
						</div>
					))
				}
				<ul className={classes.Buttons}>
					<li><Button variant={"contained"} color={"primary"} className={classes.PrimaryButton} onClick={() => this.handleModal(true)}>Solve</Button></li>
					<li><Button variant={"contained"} color={"secondary"} className={classes.SecondaryButton} onClick={this.handleReset}>Reset</Button></li>
				</ul>
				<Modal
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					className={classes.Modal}
					open={this.state.showConfirmation}
					onClose={() => this.handleModal(false)}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}
				>
					<div className={classes.Confirmation}>
						<h4>Are you sure you want to submit ? </h4>
						<ul className={classes.Buttons}>
							<li>
								<Button
									variant={"contained"}
									color={"secondary"}
									className={classes.SecondaryButton}
									onClick={() => this.handleModal(false)}
								>
									Cancel
								</Button>
							</li>
							<li>
								<Button
									variant={"contained"}
									color={"primary"}
									className={classes.PrimaryButton}
									onClick={() => this.handleSolve(this.state.grid)}
								>
									Submit
								</Button>
							</li>
						</ul>
					</div>
				</Modal>
			</div>
		)
	}
}

export default InputGrid;
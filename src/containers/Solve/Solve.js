import React, {Component} from 'react';
import classes from './Solve.module.css';
import {solveSudoku} from '../../shared/utility';
import {Backdrop, Button, Modal} from "@material-ui/core";
import Display from "../Display/Display";

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
		setTimeout(this.handleSolve, 2.5 * 1000);
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
				solvedGrid: this.props.grid
			})
		}
	};


	render () {
		let header = "Solving...";
		let tryAgain = null;
		if(this.state.solved) {
			header = "Here we go!!!";
			tryAgain =  (<Button
				variant={"contained"}
				color={"primary"}
				className={classes.PrimaryButton}
				onClick={this.props.reset}
			>
				Try new one?
			</Button>);
		}
		return (
			<div className={classes.Solve}>
				{tryAgain}
				<h3>
					{header}
				</h3>
				{this.state.error ? <p style={{color: 'red'}}>{this.state.error}</p>: null }
				<div>
					{
						this.state.solved
							? <Display grid={this.state.solvedGrid} locked={this.state.locked} />
							: <Display grid={this.props.grid} locked={this.state.locked} />
					}
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
						<div className={classes.Confirmation}>
							<h2>Solving.....</h2>
						</div>
					</Modal>
				</div>
			</div>
		);
	}
}
export default Solve;
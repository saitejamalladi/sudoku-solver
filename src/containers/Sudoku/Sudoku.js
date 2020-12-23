import React, {Component} from 'react';
import classes from './Sudoku.module.css';
import InputGrid from "../InputGrid/InputGrid";
import Solve from "../Solve/Solve";

class Sudoku extends Component {
	state = {
		requestSubmitted: false,
		grid: []
	}
	handleReset = () => {
		this.setState({
			grid: [],
			requestSubmitted: false
		})
	}
	handleSolve = (grid) => {
		this.setState({
			grid: grid,
			requestSubmitted: true
		})
	}
	render () {
		return (
			<div className={classes.Sudoku}>
				{
					this.state.requestSubmitted
						?
						<Solve
							grid={this.state.grid}
							reset={this.handleReset}/>
						: <InputGrid solve={this.handleSolve}/>
				}
			</div>
		);
	}
}
export default Sudoku;
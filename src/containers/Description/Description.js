import React, {Component} from "react";
import classes from './Description.module.css';

class Description extends Component {
	render() {
		return (
			<div className={classes.Description}>
				<h4>Welcome to Sudoku Solver!</h4>
				<p>
					 I studied Sudoku in 2010 and since then it has become one of my favourite hobbies. Each time I solve a puzzle,
					my confidence levels were boosted up and I could identify typical patterns to solve the puzzles in various levels in optimal time.
				</p>
				<p>
					After a few years, I realized that my brain was sub-consciously implementing Backtracking algorithm in solving any Sudoku.
					I studied this pattern well and now implemented it in this app which can solve a partially filled grid.
					Give a try 😁 and share your feedback with me at <a href="https://saiteja-malladi.web.app">Sai Teja Malladi</a>
				</p>
					<h4>About the game</h4>
				<p>
					<ul>
						<li>
							<span>The classic Sudoku game involves a grid of 81 squares.</span>
						</li>
						<li>
							<span>The grid is divided into nine blocks, each containing nine squares.</span>
						</li>
						<li>
							<span>The rules of the game are simple:</span>
							<ul>
								<li>
									<span>Each of the nine blocks has to contain all the numbers 1-9 within its squares.</span>
								</li>
							</ul>
							<ul>
								<li>
									<span>Each number can only appear once in a row, column or box(3 * 3).</span>
								</li>
							</ul>
						</li>
						<li>
							<a target={"_blank"} rel={"noreferrer"} href={"https://en.wikipedia.org/wiki/Sudoku"} alt={"https://en.wikipedia.org/wiki/Sudoku"}>Read more...</a>
						</li>
					</ul>
				</p>
			</div>
		);
	}
}

export default Description;
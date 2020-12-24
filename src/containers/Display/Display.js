import React from "react";
import classes from "./Display.module.css";

const getClassName = (row, col, locked) => {
	let clxList = [];
	clxList.push(classes.Cell);
	if(row%3 === 0) clxList.push(classes.Top);
	if(col%3 === 0) clxList.push(classes.Left);
	if(row === 8) clxList.push(classes.Bottom);
	if(col === 8) clxList.push(classes.Right);
	if(locked && locked[row] && locked[row][col]) clxList.push(classes.Locked);
	return clxList.join(" ");
}

const Display = (props) => {
	return (
		<table style={{borderSpacing: 0}}>
			{
				props.grid.map((row, rowIndex) => (
					<tr key={rowIndex}>
						{row.map((col, colIndex) => (
							<td
								key={rowIndex+"-"+colIndex}
								onChange={(e) => this.handleChange(e, rowIndex, colIndex)}
								className={getClassName(rowIndex, colIndex, props.locked)}
							>
								{col}
							</td>
						))}
						<br/>
					</tr>
				))
			}
		</table>
	)
};
export default Display;
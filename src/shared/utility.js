export const isSafe = (grid, row, col, num) => {
	// Check if we find the same num in the similar row , we return false
	for (let x = 0; x < 9; x++) {
		if (grid[row][x] === num) return false;
	}
	// Check if we find the same num in the similar column we return false
	for (let x = 0; x < 9; x++) {
		if (grid[x][col] === num) return false;
	}
	// Check if we find the same num in the particular 3*3 matrix, we return false
	let startRow = row - row % 3;
	let startCol = col - col % 3;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (grid[i + startRow][j + startCol] === num) return false;
		}
	}
	return true;
}

export const solveSudoku = (grid, row, col, size) => {
	if(row === size-1 && col === size) {
		return true;
	}
	if(col === size) {
		row++;
		col = 0;
	}
	if(grid[row][col] !== '') {
		return solveSudoku(grid, row, col+1, size);
	}
	for(let num=1; num<=9; num++) {
		if (isSafe(grid, row, col, num)) {
			grid[row][col] = num;
			if (solveSudoku(grid, row, col + 1, size)) return true;
		}
		grid[row][col] = '';
	}
	return false;
};

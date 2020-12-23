import React, {Component} from "react";
import {Button, Backdrop, Fade, Modal} from '@material-ui/core';
import SudokuInputForm from './containers/SudokuSolver/SudokuInputForm';
import SudokuSolver from "./containers/SudokuSolver/SudokuSolver";
import classes from './App.module.css';
import DisplaySudoku from "./containers/SudokuSolver/DisplaySudoku";

const styles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paperContainer: {
    width: '500px',
    backgroundColor: 'white',
  },
};

class App extends Component {
  state = {
    grid: [],
    lockedBlocks: [],
    requestSubmitted: false,
    requestInitiated: false,
  }
  lockInputBlocks = (grid) => {
    let lockedBlocks = [];
    grid.forEach(row => {
      let currentRow = [];
      row.forEach(cell => {
        if(cell) {
          currentRow.push(true);
        } else {
          currentRow.push(false);
        }
      })
      lockedBlocks.push(currentRow);
    })
    this.setState({
      lockedBlocks: lockedBlocks
    })
  }
  handleRequestInit = (grid) => {
    this.lockInputBlocks(grid);
    this.setState({
      grid: grid,
      requestInitiated: true
    })
  }
  handleClose = () => {
    this.setState({
      requestInitiated: false
    })
  }
  handleSolve = () => {
    this.setState({
      requestInitiated: false,
      requestSubmitted: true
    })
  }
  handleReset = () => {
    this.setState({
      grid: [],
      lockedBlocks: [],
      requestSubmitted: false
    })
  }
  render () {
    return (
      <div className={classes.App}>
        <Button variant={"contained"} color={"secondary"} onClick={this.handleReset}>Reset</Button>
        {
          this.state.requestSubmitted
           ? <SudokuSolver grid={this.state.grid} lockedBlocks={this.state.lockedBlocks}/>
           : <SudokuInputForm initHandler={this.handleRequestInit}/>
        }
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          style={styles.modal}
          open={this.state.requestInitiated}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.requestInitiated}>
            <div style={styles.paperContainer}>
              <h2>Are you sure you want to submit the below puzzle ? </h2>
              <DisplaySudoku grid={this.state.grid} lockedBlocks={this.state.lockedBlocks} />
              <Button variant={"contained"} color={"primary"} onClick={this.handleSolve}>Submit</Button>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default App;

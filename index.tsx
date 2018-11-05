import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
const Cell = styled.div`
  font-size: 30px;
`;

type Weight = number[][][];
const activation = v => Math.max(v, 0);
const forward = (input: number[], weight: Weight): number[] =>
  weight.reduce(
    (prev, w, s) =>
      w
        .map(wi => wi.map((wj, j) => wj * prev[j]))
        .reduce(
          (next, values) => values.map((v, j) => next[j] + v),
          w[0].map(_ => 0)
        )
        .map(s === 1 ? activation : v => v),
    input
  );

const backward = (input: number[], weight: Weight, diff: number[]) => {
  const v1 = diff.map((d, j) => weight[1].map(w));
};

const initBoard = (): number[] => new Array(9).fill(0);
class Board extends React.Component {
  state = { board: initBoard(), color: 1 };
  toggleColor = () => {
    const newColor = this.state.color === 1 ? -1 : 1;
    this.setState({ color: newColor });
    return newColor;
  };
  onClick = (n: number) => () => {
    if (this.state.board[n] === 0) {
      const newBoard = [...this.state.board];
      newBoard[n] = this.state.color;
      this.setState({ board: newBoard });
      this.toggleColor();
    }
  };
  reset = () => {
    this.setState({ board: initBoard() });
  };
  render() {
    return (
      <div>
        <button onClick={this.reset}>reset</button>
        <Column>
          {new Array(3).fill(0).map((_, i) => (
            <Row key={i}>
              {new Array(3).fill(0).map((_, j) => (
                <Cell onClick={this.onClick(j + i * 3)}>
                  {this.state.board[j + i * 3] === 1
                    ? '○'
                    : this.state.board[j + i * 3] === -1
                      ? '×'
                      : '□'}
                </Cell>
              ))}
            </Row>
          ))}
        </Column>
      </div>
    );
  }
}

ReactDOM.render(<Board />, document.getElementById('root'));

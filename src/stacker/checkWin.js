function validateSelectedItems({ item1, item2, item3, item4, username }) {
  if (
    item1.value === item2.value &&
    item1.value === item3.value &&
    item1.value === item4.value &&
    item1.owner === item2.owner &&
    item1.owner === item3.owner &&
    item1.owner === item4.owner &&
    item1.value.length > 0 &&
    item1.owner.length > 0
  ) {
    if (item1.owner === username) {
      return true;
    } else {
      return false;
    }
  }
}

function checkWin({ row, item, items, setItems, username, setWin }) {
  // working with row
  const nthRowItem = Number(item.match(/[1-9]/)[0]);

  let rowStartCount = nthRowItem - 3;
  let rowEndCount = nthRowItem;

  if (nthRowItem - 3 < 1) {
    rowStartCount = 1;
    rowEndCount = rowStartCount + 3;
  }

  while (true) {
    if (rowEndCount > 7 || rowStartCount > nthRowItem) {
      break;
    }

    const item1 = items[row][`item${rowStartCount}`];
    const item2 = items[row][`item${rowStartCount + 1}`];
    const item3 = items[row][`item${rowStartCount + 2}`];
    const item4 = items[row][`item${rowStartCount + 3}`];

    const validated = validateSelectedItems({
      item1,
      item2,
      item3,
      item4,
      username,
    });

    if (validated === true || validated === false) {
      let wonPiece = validated === true ? "user" : "opponent";

      setItems((old) => {
        let itemrow1 = `item${rowStartCount}`;
        let itemrow2 = `item${rowStartCount + 1}`;
        let itemrow3 = `item${rowStartCount + 2}`;
        let itemrow4 = `item${rowStartCount + 3}`;
        return {
          ...old,
          [row]: {
            ...old[row],
            [itemrow1]: {
              ...old[row][itemrow1],
              wonPiece,
            },
            [itemrow2]: {
              ...old[row][itemrow2],
              wonPiece,
            },
            [itemrow3]: {
              ...old[row][itemrow3],
              wonPiece,
            },
            [itemrow4]: {
              ...old[row][itemrow4],
              wonPiece,
            },
          },
        };
      });
      setWin(validated);
      return true;
    }

    // logic for row here

    rowStartCount++;
    rowEndCount++;
  }

  // working with column
  const nthColumnItem = Number(row.match(/[1-9]/)[0]);

  let columnStartCount = nthColumnItem - 3;
  let columnEndCount = nthColumnItem;

  if (nthColumnItem - 3 < 1) {
    columnStartCount = 1;
    columnEndCount = columnStartCount + 3;
  }

  while (true) {
    if (columnEndCount > 7 || columnStartCount > nthColumnItem) {
      break;
    }
    // logic for row here

    const item1 = items[`row${columnStartCount}`][item];
    const item2 = items[`row${columnStartCount + 1}`][item];
    const item3 = items[`row${columnStartCount + 2}`][item];
    const item4 = items[`row${columnStartCount + 3}`][item];

    const validated = validateSelectedItems({
      item1,
      item2,
      item3,
      item4,
      username,
    });

    if (validated === true || validated === false) {
      let wonPiece = validated === true ? "user" : "opponent";

      setItems((old) => {
        let itemClm1 = `row${columnStartCount}`;
        let itemClm2 = `row${columnStartCount + 1}`;
        let itemClm3 = `row${columnStartCount + 2}`;
        let itemClm4 = `row${columnStartCount + 3}`;

        return {
          ...old,
          [itemClm1]: {
            ...old[itemClm1],
            [item]: { ...old[itemClm1][item], wonPiece },
          },
          [itemClm2]: {
            ...old[itemClm2],
            [item]: { ...old[itemClm2][item], wonPiece },
          },
          [itemClm3]: {
            ...old[itemClm3],
            [item]: { ...old[itemClm3][item], wonPiece },
          },
          [itemClm4]: {
            ...old[itemClm4],
            [item]: { ...old[itemClm4][item], wonPiece },
          },
        };
      });
      setWin(validated);
      return true;
    }

    columnStartCount++;
    columnEndCount++;
  }

  // working with diagonal left to right

  const diagonalItem = Number(item.match(/[1-9]/)[0]);
  const diagonalRow = Number(row.match(/[1-9]/)[0]);

  let diagonalStart;
  let diagonalEnd;

  if (diagonalItem > diagonalRow) {
    diagonalStart = { row: 1, column: diagonalItem - diagonalRow + 1 };
    diagonalEnd = {
      row: diagonalStart.row + 3,
      column: diagonalStart.column + 3,
    };
  } else {
    diagonalStart = { row: diagonalRow - diagonalItem + 1, column: 1 };
    diagonalEnd = {
      row: diagonalStart.row + 3,
      column: diagonalStart.column + 3,
    };
  }

  while (true) {
    if (
      diagonalEnd.row > 7 ||
      diagonalEnd.column > 7 ||
      diagonalStart.row > diagonalRow ||
      diagonalStart.column > diagonalItem
    ) {
      break;
    }

    const item1 =
      items[`row${diagonalStart.row}`][`item${diagonalStart.column}`];
    const item2 =
      items[`row${diagonalStart.row + 1}`][`item${diagonalStart.column + 1}`];
    const item3 =
      items[`row${diagonalStart.row + 2}`][`item${diagonalStart.column + 2}`];
    const item4 =
      items[`row${diagonalStart.row + 3}`][`item${diagonalStart.column + 3}`];

    const validated = validateSelectedItems({
      item1,
      item2,
      item3,
      item4,
      username,
    });

    if (validated === true || validated === false) {
      let wonPiece = validated === true ? "user" : "opponent";

      setItems((old) => {
        let itemClm1 = `row${diagonalStart.row}`;
        let itemClm2 = `row${diagonalStart.row + 1}`;
        let itemClm3 = `row${diagonalStart.row + 2}`;
        let itemClm4 = `row${diagonalStart.row + 3}`;

        let itemrow1 = `item${diagonalStart.column}`;
        let itemrow2 = `item${diagonalStart.column + 1}`;
        let itemrow3 = `item${diagonalStart.column + 2}`;
        let itemrow4 = `item${diagonalStart.column + 3}`;

        return {
          ...old,
          [itemClm1]: {
            ...old[itemClm1],
            [itemrow1]: { ...old[itemClm1][itemrow1], wonPiece },
          },
          [itemClm2]: {
            ...old[itemClm2],
            [itemrow2]: { ...old[itemClm2][itemrow2], wonPiece },
          },
          [itemClm3]: {
            ...old[itemClm3],
            [itemrow3]: { ...old[itemClm3][itemrow3], wonPiece },
          },
          [itemClm4]: {
            ...old[itemClm4],
            [itemrow4]: { ...old[itemClm4][itemrow4], wonPiece },
          },
        };
      });
      setWin(validated);
      return true;
    }

    // logic for row here

    diagonalEnd.row += 1;
    diagonalEnd.column += 1;
    diagonalStart.row += 1;
    diagonalStart.column += 1;
  }

  // working with diagonal right to left

  let diagonalStartLR = [];
  let diagonalEndLR;

  let iterateCountRow = diagonalRow;
  let iterateCountColumn = diagonalItem;

  while (true) {
    if (iterateCountRow < 1 || iterateCountColumn > 7) {
      break;
    }
    diagonalStartLR.push({ row: iterateCountRow, column: iterateCountColumn });

    iterateCountRow--;
    iterateCountColumn++;
  }

  diagonalStartLR = diagonalStartLR[diagonalStartLR.length - 1];
  diagonalEndLR = {
    row: diagonalStartLR.row + 3,
    column: diagonalStartLR.column - 3,
  };

  while (true) {
    if (
      diagonalEndLR.row > 7 ||
      diagonalEndLR.column < 1 ||
      diagonalStartLR.row > diagonalRow ||
      diagonalStartLR.column < diagonalItem
    ) {
      break;
    }

    // logic for row here

    const item1 =
      items[`row${diagonalStartLR.row}`][`item${diagonalStartLR.column}`];
    const item2 =
      items[`row${diagonalStartLR.row + 1}`][
        `item${diagonalStartLR.column - 1}`
      ];
    const item3 =
      items[`row${diagonalStartLR.row + 2}`][
        `item${diagonalStartLR.column - 2}`
      ];
    const item4 =
      items[`row${diagonalStartLR.row + 3}`][
        `item${diagonalStartLR.column - 3}`
      ];

    const validated = validateSelectedItems({
      item1,
      item2,
      item3,
      item4,
      username,
    });

    if (validated === true || validated === false) {
      let wonPiece = validated === true ? "user" : "opponent";

      setItems((old) => {
        let itemClm1 = `row${diagonalStartLR.row}`;
        let itemClm2 = `row${diagonalStartLR.row + 1}`;
        let itemClm3 = `row${diagonalStartLR.row + 2}`;
        let itemClm4 = `row${diagonalStartLR.row + 3}`;

        let itemrow1 = `item${diagonalStartLR.column}`;
        let itemrow2 = `item${diagonalStartLR.column - 1}`;
        let itemrow3 = `item${diagonalStartLR.column - 2}`;
        let itemrow4 = `item${diagonalStartLR.column - 3}`;

        return {
          ...old,
          [itemClm1]: {
            ...old[itemClm1],
            [itemrow1]: { ...old[itemClm1][itemrow1], wonPiece },
          },
          [itemClm2]: {
            ...old[itemClm2],
            [itemrow2]: { ...old[itemClm2][itemrow2], wonPiece },
          },
          [itemClm3]: {
            ...old[itemClm3],
            [itemrow3]: { ...old[itemClm3][itemrow3], wonPiece },
          },
          [itemClm4]: {
            ...old[itemClm4],
            [itemrow4]: { ...old[itemClm4][itemrow4], wonPiece },
          },
        };
      });
      setWin(validated);
      return true;
    }

    diagonalEndLR.row += 1;
    diagonalEndLR.column -= 1;
    diagonalStartLR.row += 1;
    diagonalStartLR.column -= 1;
  }
}
export default checkWin;

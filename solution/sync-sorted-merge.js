"use strict";

// Print all entries, across all of the sources, in chronological order.

const initializeArray = (logSources) => {
  return logSources.map((logSource) => logSource.pop());
};

const printNextAndGetIndex = (array, printer) => {
  try {
    let next = null;
    let nextLogEntry = null;
    let lowestIndex = null;

    for (const [index, entry] of array.entries()) {
      if (entry && (entry.date.getTime() < next || next === null)) {
        next = entry.date.getTime();
        lowestIndex = index;
        nextLogEntry = entry;
      }
    }
    printer.print(nextLogEntry);
    return lowestIndex;
  } catch (e) {
    console.log(e);
  }
};

const checkIfDone = (array) => {
  return array.every((entry) => entry === false);
};

module.exports = (logSources, printer) => {
  const array = initializeArray(logSources);
  while (!checkIfDone(array)) {
    const index = printNextAndGetIndex(array, printer);
    array[index] = logSources[index].pop();
  }
  printer.done();
};

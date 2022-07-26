"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

const initializeArray = async (logSources) => {
   const array = await Promise.all( logSources.map( (logSource) => logSource.popAsync()));
   return array;
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

module.exports = async (logSources, printer) => {
  const array = await initializeArray(logSources);
  while (!checkIfDone(array)) {
    const index = printNextAndGetIndex(array, printer);
    array[index] = await logSources[index].popAsync();
  }
  printer.done();
};

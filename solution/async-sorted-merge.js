"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise((resolve, reject) => {
    for(let i=0;i<3;i++){
      let logEntry= logSources[i].popAsync();
      printer.print(logEntry);
     }
    resolve(console.log("Async sort complete."));
  });
};

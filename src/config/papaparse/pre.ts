import Papa, {ParseResult}        from "papaparse";

// @ts-ignore
Papa.parsePromise = function (file, options) {
  return new Promise(function(complete, error) {
    // @ts-ignore
    Papa.parse(file, {...options, complete});
  });
}

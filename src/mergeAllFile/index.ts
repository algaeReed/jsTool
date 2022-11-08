import fs from "fs";
import path from "path";

const readFileList = (
  dir: string,
  filesList: string[],
  fileSuffix?: string
) => {
  const files = fs.readdirSync(dir);
  fileSuffix
    ? files
        .filter((e) => fileSuffix && e.indexOf(fileSuffix) !== -1)
        .forEach((item, index) => {
          const fullPath: string = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            readFileList(path.join(dir, item), filesList, fileSuffix);
          } else {
            filesList.push(fullPath);
          }
        })
    : files.forEach((item, index) => {
        const fullPath: string = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          readFileList(path.join(dir, item), filesList, fileSuffix);
        } else {
          filesList.push(fullPath);
        }
      });
  return filesList;
};
/**
 *
 * @param path  folder absolute path
 * @param fileSuffix file suffix
 * @param outFile out file name
 */
const mergeAllText = (
  path: string,
  outFile?: string,
  fileSuffix?: string,
  callback?: any
) => {
  let filesList: [] = [];
  readFileList(path, filesList, fileSuffix);
  filesList.map((e) => {
    fs.readFile(e, "utf-8", (err, dataStr) => {
      fs.appendFile(outFile ?? `out`, dataStr + "\r\n", (err) => {
        if (err) {
          callback("err");
        }
        callback("ok");
      });
    });
  });
};

export default mergeAllText ;

import fs from "fs";

const existFile = (path: string): boolean => {
    return fs.existsSync(path);
};

const writeFileSync = (path: string, data: Array<{ id: number, data: string, connect: boolean }>): Array<any> => {
    fs.writeFileSync(path, JSON.stringify(data));
    return data;
};

const readFileSync = (path: string): Array<any> => {
    return JSON.parse(fs.readFileSync(path,
        { encoding: "utf8", flag: "r" }));
};

export { existFile, writeFileSync, readFileSync };
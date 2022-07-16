import fs from "fs";
import path from "path";
import { randomValues } from "./random-world-location";

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

const addItem = (id: number, connect: boolean, elements: any) => {
    return {
      id: (!elements.length) ? 1 : elements.length + 1,
      user: id,
      data: new Date().toISOString(),
      connect,
      location: randomValues(1)[0]
    };
  };

const saveConnection = (id: number, connect: boolean, elements: any) => {
    const jsonPath = path.join(__dirname, "..", "..", "data", "connections.json");
    let connections = [];
    try {
      const addItemValue = addItem(id, connect, elements);
      if (!existFile(jsonPath)) {
        connections = writeFileSync(jsonPath, [
          addItemValue
        ]);
      } else {
        connections = readFileSync(jsonPath);
        connections.push( addItemValue );
        writeFileSync(jsonPath, connections);
      }
      // Emitir cambios con las conexiones
      return {
        ok: true,
        item: addItemValue
      };
    } catch (e: any) {
      return {
        ok: false
      };
    }
  
  };

export { existFile, writeFileSync, readFileSync, saveConnection, addItem };
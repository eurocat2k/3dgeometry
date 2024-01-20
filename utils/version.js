import path from 'path'
import fs from 'fs/promises'
export function getVersion(p) {
    return new Promise(async (res, rej) => {
        try {
            let fsdata = await fs.readFile(path.join(p, 'package.json'));
            let json = JSON.parse(fsdata);
            res(json.version);
        } catch (error) {
            console.error(error);
            rej(false);
        }
    })
}

import fs from "fs";
import path from "path";

export function listFiles(directory: string): void {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.log(err);
        } else {
            files.forEach((file) => {
                console.log(file);
                fs.stat(path.join(directory, file), (err, stats) => {
                    console.log('Modificación: ' + stats.mtime);
                    console.log('Tamaño: ' + stats.size);
                })
            });
        }
    });
}

export function removeFile(file: string): void {
    fs.exists(file, (exists) => {
        if (exists) {
            fs.writeFile(path.join('src/mod/trash', path.basename(file)), '', (err) => {
                if (err) {
                    console.log(err);
                }
            });

            fs.copyFile(file, path.join('src/mod/trash', path.basename(file)), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        
            fs.rm(file, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        else {
            console.log('El fichero no existe.');
        }
    });
}

export function copyFile(src: string, dest: string): void {
    fs.exists(src, (exists) => {
        if (exists) {
            fs.stat(src, (err, stats) => {
                if (stats.isDirectory()) {
                    fs.mkdir(path.join(dest, path.basename(src)), { recursive: true }, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })

                    fs.cp(src, path.join(dest, path.basename(src)), (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                
                    fs.rmdir(src, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                } else {
                    fs.open(path.join(dest, path.basename(src)), 'a', (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });

                    fs.cp(src, path.join(dest, path.basename(src)), (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                
                    fs.rm(src, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            })

            
        }
        else {
            console.log('El fichero no existe.');
        }
    });
}

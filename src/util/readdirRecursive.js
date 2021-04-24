import fs from 'fs';

export default (dir) => {
    var fileArray = new Array();

    const readDir = (dir, files) => {
        fs.readdirSync(dir).forEach(function (file) {
            var subpath = dir + '/' + file;
            if (fs.lstatSync(subpath).isDirectory()) {
                readDir(subpath, files);
            } else {
                files.push(dir + '/' + file);
            }
        });
    };

    readDir(dir, fileArray);

    return fileArray;
};

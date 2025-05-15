import * as fs from "fs";

const CHUNK_SIZE = 8;
const buffer = Buffer.alloc(CHUNK_SIZE);
const filePath = "/tmp/foo";

fs.open(filePath, "r", function (err, fd) {
  if (err) throw err;
  function readNextChunk() {
    fs.read(fd, buffer, 0, CHUNK_SIZE, null, function (err, nread) {
      if (err) throw err;

      if (nread === 0) {
        // done reading file, do any necessary finalization steps

        fs.close(fd, function (err) {
          if (err) throw err;
        });
        return;
      }

      var data;
      if (nread < CHUNK_SIZE) data = buffer.slice(0, nread);
      else data = buffer;

      // do something with `data`, then call `readNextChunk();`
    });
  }
  readNextChunk();
});

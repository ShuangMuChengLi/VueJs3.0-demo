let node_ssh = require('node-ssh');
let ssh = new node_ssh();
let config = require('../config/config');
var fs = require('fs');
var path = require('path');
var archiver = require('archiver');
ssh.connect({
  host: config.publishServer.host,
  username: config.publishServer.username,
  privateKey: config.publishServer.privateKey || null,
  port: config.publishServer.port || 22,
  password: config.publishServer.password || null,
}).then(async (e)=>{
  // create a file to stream archive data to.
  var output = fs.createWriteStream(path.resolve(__dirname, '../dist.zip'));
  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', async function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
    await ssh.execCommand(`cp -r dist dist${new Date().getTime()}`, { cwd:config.publishServer.serverPath }).then(function(result) {
      console.log(result);
    }).catch((err)=>{
      console.error(err);
    });
    await ssh.execCommand('rm -rf dist/*', { cwd:  config.publishServer.serverPath}).then(function(result) {
      console.log(result);
    }).catch((err)=>{
      console.error(err);
    });
    await ssh.putFile(path.resolve(__dirname, '../dist.zip'), config.publishServer.serverPath + '/dist/dist.zip').then(function(result) {
      console.log(result);
    }).catch((err)=>{
      console.error(err);
      process.exit();
    });
    await ssh.execCommand('unzip dist.zip', { cwd:  config.publishServer.serverPath + '/dist'}).then(function(result) {
      console.log(result);
      process.exit();
    }).catch((err)=>{
      console.error(err);
      process.exit();
    });
  });

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on('end', function() {
    console.log('Data has been drained');

  });

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      // log warning
      console.error(err);
    } else {
      // throw error
      throw err;
    }
  });

  // good practice to catch this error explicitly
  archive.on('error', function(err) {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);


  // append files from a sub-directory, putting its contents at the root of archive
  archive.directory('dist/', false);


  // finalize the archive (ie we are done appending files but streams have to finish yet)
  // 'close', 'end' or 'finish' may be  fired right after calling this method so register to them beforehand
  archive.finalize();


}).catch((err)=>{
  console.error(err);
});

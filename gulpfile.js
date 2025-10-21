const { spawn, ChildProcess } = require('child_process');
const watch = require('gulp-watch');

/**
 * @type ChildProcess | undefined
 */
let agsProcess = null;

function startAgs() {
  if (agsProcess) {
    spawn('pkill', ['ags3'])
    const killed = agsProcess?.kill(9);
    console.log("Is killed: ", killed)
    agsProcess = null
  }

  if (!agsProcess) {
    console.log("Started")
    agsProcess = spawn('ags3', ['run', 'app.ts']);
    agsProcess.stdout.on('data', (data) => {
      console.log(`AGS: ${data}`);
    });
    agsProcess.stderr.on('data', (data) => {
      console.error(`AGS Error: ${data}`);
    });
    agsProcess.on("close", () => {
      console.log("Instanse was closed");
    })
  }
}

function watchFiles() {
  watch([
    '**/*.ts',
    '**/*.tsx',
    '**/*.scss',
    '**/*.js',
    'widgets/*.tsx',
    'widget/*.tsx'
  ], function() {
    startAgs();
  });
}

exports.watch = watchFiles;
exports.default = watchFiles; 

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import faucet from 'faucet';
import glob from 'glob-promise';

const $ = gulpLoadPlugins();
const testGlob = ['*-spec.js'];
const nonTestNonGulpfileGlob = '!(gulpfile*|*spec).js';

gulp.task('reload-modules', () => {
  var reloadPromise = new Promise(resolve => {
    glob(nonTestNonGulpfileGlob).then(files => {
        files.forEach( file => delete require.cache[require.resolve(`./${file}`)] );
      }).then(() => {
        resolve();
      });
  });

  return reloadPromise;
});


gulp.task('tape', ['reload-modules'], () => {
  console.log('about to start the tests');

  return gulp.src(testGlob, { read: true } )
    .pipe($.tape({ reporter: faucet() }));
});

gulp.task('default', ['tape'], () => {
  gulp.watch('*.js', ['tape']);
});

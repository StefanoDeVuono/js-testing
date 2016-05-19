import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import faucet from 'faucet';
import glob from 'glob';

const $ = gulpLoadPlugins();
const testGlob = ['*-spec.js'];
const nonTestNonGulpfileGlob = '!(gulpfile*|*spec).js';

gulp.task('tape', () => {
  glob(nonTestNonGulpfileGlob, (err, files) => {
    files.forEach( file => delete require.cache[require.resolve(`./${file}`)] );
  });

  return gulp.src(testGlob, { read: true } )
    .pipe($.tape({ reporter: faucet() }));
});

gulp.task('default', ['tape'], () => {
  gulp.watch('*.js', ['tape']);
});

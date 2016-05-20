import test from 'tape-catch';
import cheerio from 'cheerio';
import * as PhotoLister from './photo-lister';

test('PhotoLister exists', assert => {
  assert.ok(PhotoLister);

  assert.end();
});

test('#photoListItem() takes a photo object and returns a list item string', assert => {
  var input = {
        title: 'This is a test',
        url:   'http://loremflickr.com/960/593'
      },
      expected =  '<li><figure><img src="http://loremflickr.com/960/593" alt="" />' +
                  '<figcaption>This is a test</figcaption></figure></li>';

  assert.equal(PhotoLister.photoListItem(input), expected);

  input = {
    title: 'This is another test',
    url:   'http://loremflickr.com/960/593/puppy'
  }
  expected = '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt="" />' +
             '<figcaption>This is another test</figcaption></figure></li>';

  assert.equal(PhotoLister.photoListItem(input), expected);

  assert.end();
});

test('#photoListToHTML() takes an array of photo objects and converts them to an HTML list', assert => {
  var input = [{
        title: 'This is a test',
        url:   'http://loremflickr.com/960/593'
      }, {
        title: 'This is another test',
        url:   'http://loremflickr.com/960/593/puppy'
      }],
      expected = '<ul><li><figure><img src="http://loremflickr.com/960/593" alt="" />' +
                 '<figcaption>This is a test</figcaption></figure></li>' +
                 '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt="" />' +
                 '<figcaption>This is another test</figcaption></figure></li></ul>';

  assert.equal(PhotoLister.photoListToHTML(input), expected);

  assert.end();

});

test('#addPhotosToElement() takes an HTML string of list items and adds them to an element with a given selector', assert => {
  var $        = cheerio.load('<html><head></head><body><div id="mydiv"></div></body></html>'),
      list     = '<ul><li><figure><img src="http://loremflickr.com/960/593" alt="" />' +
                 '<figcaption>This is a test</figcaption></figure></li>' +
                 '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt="" />' +
                 '<figcaption>This is another test</figcaption></figure></li></ul>',
      selector = '#mydiv',
      $div     = PhotoLister.addPhotosToElement($, selector, list);

      assert.equal($div.find('ul').length, 1);
      assert.equal($div.find('li').length, 2);
      assert.equal($div.find('figure').length, 2);
      assert.equal($div.find('img').length, 2);
      assert.equal($div.find('figcaption').length, 2);

      assert.end();
})

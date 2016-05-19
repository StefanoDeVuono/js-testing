import test from 'tape-catch';
import * as FlickrFetcher from './flickr-fetcher';

test('FlickrFetcher is defined', (assert) => {
  assert.ok(FlickrFetcher);
  console.log("helo", FlickrFetcher);
  debugger

  assert.end();
});

test('#photoObjToURL() should take a photo object from Flickr and return a string', (assert) => {
  let input = {
    id:       '24770505034',
    owner:    '97248275@N03',
    secret:   '31a9986429',
    server:   '1577',
    farm:     2,
    title:    '20160229090898',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
      expected = 'https://farm2.staticflickr.com/1577/24770505034_31a9986429_b.jpg',
      actual = FlickrFetcher.photoObjToURL(input);

  assert.deepEqual(actual, expected);

  assert.end();
});

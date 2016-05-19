import test from 'tape-catch';
import * as FlickrFetcher from './flickr-fetcher';

test('FlickrFetcher is defined', (assert) => {
  assert.ok(FlickrFetcher);
  console.log("helo", FlickrFetcher);
  debugger

  assert.end();
});

test('#photoObjToURL() takes a photo object from Flickr and returns a string', (assert) => {
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
  input = {
    id:       '24770504484',
    owner:    '97248275@N03',
    secret:   '69dd90d5dd',
    server:   '1451',
    farm:     2,
    title:    '20160229090903',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  expected = 'https://farm2.staticflickr.com/1451/24770504484_69dd90d5dd_b.jpg',
  actual = FlickrFetcher.photoObjToURL(input);

  assert.deepEqual(actual, expected);

  assert.end();
});

test('#transformPhotoObj() takes a photo object and returns an object with just title and URL', (assert) => {
  let input = {
    id:       '25373736106',
    owner:    '99117316@N03',
    secret:   '146731fcb7',
    server:   '1669',
    farm:     2,
    title:    'Dog goes to desperate measure to avoid walking on a leash',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  expected =  {
    title: 'Dog goes to desperate measure to avoid walking on a leash',
    url: 'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg'
  },
  actual = FlickrFetcher.transformPhotoObj(input);

  assert.deepEqual(actual, expected);

  input = {
    id:       '24765033584',
    owner:    '27294864@N02',
    secret:   '3c190c104e',
    server:   '1514',
    farm:     2,
    title:    'the other cate',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  },
  expected = {
      title: 'the other cate',
      url:   'https://farm2.staticflickr.com/1514/24765033584_3c190c104e_b.jpg'
  },
  actual = FlickrFetcher.transformPhotoObj(input);

  assert.deepEqual(actual, expected);

  assert.end();
});

test('#fetchFlickerData() takes an API key and fetcher function argument and returns a promise for JSON data', (assert) => {
  let apiKey = 'whatever dude, no one cares for the purpose of this test',
      fakeData = {
        'photos': {
          'page':    1,
          'pages':   2872,
          'perpage': 100,
          'total':   '287170',
          'photo':   [{
            'id':       '24770505034',
            'owner':    '97248275@N03',
            'secret':   '31a9986429',
            'server':   '1577',
            'farm':     2,
            'title':    '20160229090898',
            'ispublic': 1,
            'isfriend': 0,
            'isfamily': 0
          }, {
            'id':       '24770504484',
            'owner':    '97248275@N03',
            'secret':   '69dd90d5dd',
            'server':   '1451',
            'farm':     2,
            'title':    '20160229090903',
            'ispublic': 1,
            'isfriend': 0,
            'isfamily': 0
          }]
        }
      },
      fakeFetcher = function(url) {
        let expectedUrl =`https://api.flickr.com/services/rest/?`+
          `method=flickr.photos.search&api_key=${apiKey}&` +
          `text=pugs&format=json&nojsoncallback=1`;
        assert.equal(url, expectedUrl);
        return Promise.resolve(fakeData);
      };
    FlickrFetcher.fetchFlickerData(apiKey, fakeFetcher).then(actual => {
      assert.deepEqual(actual, fakeData);
      assert.end();
    })
});

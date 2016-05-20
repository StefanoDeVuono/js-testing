var PhotoLister;

PhotoLister = {
  photoListItem: function(photo) {
    return `<li><figure><img src="${photo.url}" alt="" />` +
           `<figcaption>${photo.title}</figcaption></figure></li>`;
    },
  photoListToHTML: function(photos) {
    return `<ul>${photos.map(PhotoLister.photoListItem).join('')}</ul>`
  }
};

module.exports = PhotoLister;

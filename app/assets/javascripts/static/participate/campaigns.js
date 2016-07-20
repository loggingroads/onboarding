
import Fuse from 'fuse.js';

const campaigns = [
  {
    name: 'Una',
    start_date: '2015-05-12',
    htag: 'tag1 tag2 tag3'
  },
  {
    name: 'Dos',
    start_date: '2015-05-12',
    htag: 'tag1 tag2 tag3'
  },
  {
    name: 'Tres',
    start_date: '2015-05-12',
    htag: 'tag1 tag2 tag3'
  },
  {
    name: 'Catres',
    start_date: '2015-05-12',
    htag: 'tag1 tag2 tag3'
  }
];


const options = {
  keys: Object.keys(campaigns[0])
};

const fuse = new Fuse(campaigns, options);
const result = fuse.search('tres');


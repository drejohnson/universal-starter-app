import { Chance } from 'chance';

var chance = new Chance();

// Our API for demos only
export const fakeDataBase = {
  get() {
    const post = {
      title: chance.sentence({words: 5}),
      intro: chance.sentence(),
      description: chance.paragraph({sentences: 2})
    }
    let res = {
      data: post
    };
    return Promise.resolve(res);
  }
};

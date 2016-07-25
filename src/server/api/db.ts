import * as casual from 'casual';

// Our API for demos only
export const fakeDataBase = {
  get() {
    const post = {
      title: casual.title,
      intro: casual.short_description,
      description: casual.description
    }
    let res = {
      data: post
    };
    return Promise.resolve(res);
  }
};

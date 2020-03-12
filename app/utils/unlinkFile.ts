import * as fs from 'fs';

export const unlinkFile = async path => {
  return await new Promise(resolve => {
    fs.unlink(path, err => {
      if (err) resolve(err);
      resolve(path + '删除成功');
    });
  });
};

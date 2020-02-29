import * as bcrypt from '../../app/utils/bcrypt';
import * as assert from 'assert';

const myPlaintextPassword = '123456789';
const otherPlaintextPassword = '123456';

describe('密码加密', () => {
  it('hash', () => {
    const password = bcrypt.hashSync(myPlaintextPassword);
    assert(password !== myPlaintextPassword);
  });

  describe('compare', () => {
    it('比较成功', () => {
      const hash = bcrypt.hashSync(myPlaintextPassword);
      const isCompare = bcrypt.compareSync(myPlaintextPassword, hash);

      assert(isCompare);
    });

    it('比较失败 ', () => {
      const hash = bcrypt.hashSync(myPlaintextPassword);
      const isCompare = bcrypt.compareSync(otherPlaintextPassword, hash);
      assert(!isCompare);
    });
  });
});

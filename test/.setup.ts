import { app } from 'egg-mock/bootstrap';
import * as factories from './factories';

before(() => {
  factories.setup(app);
});

afterEach(async () => {
  // clear database after each test case
  await Promise.all([app.model.User.destroy({ truncate: true, force: true })]);
  await Promise.all([app.model.Article.destroy({ truncate: true, force: true })]);
  await Promise.all([app.model.Video.destroy({ truncate: true, force: true })]);
  await Promise.all([app.model.Reply.destroy({ truncate: true, force: true })]);
  await Promise.all([app.model.Journal.destroy({ truncate: true, force: true })]);
  await Promise.all([app.model.Course.destroy({ truncate: true, force: true })]);
});

after(async () => {
  await factories.cleanup();
});
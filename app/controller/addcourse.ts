import BaseController from '../core/BaseController';

export default class AddCourseController extends BaseController{
	public async index(){

		this.ctx.validate(this.getRule(),this.ctx.request.body)
		// const resdata = await this.ctx.service
	}
// 
// id:教程id     userId:用户id
	private getRule() {
    return {
      id: {
        required: true,
        type: 'string'
      },
      user_id: {
        required: true,
        type: 'string'
      }
    };
  }
}
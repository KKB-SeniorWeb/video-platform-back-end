import { Service } from 'egg';
import { unlinkFile } from '../utils/unlinkFile';
import { v4 as uuidv4 } from 'uuid';

interface VideoModel {
  id: string;
  video_name: string;
  video_path: string;
}

interface VideoInfo {
  video_path: string;
  video_name: string;
}

class Video extends Service {
  async upload({ video_path, video_name }: VideoInfo) {
    const { ctx } = this;
    const res = await ctx.model.Video.create(this.generateVideoTable({ video_path, video_name }));
    console.log(res);
    return res;
  }

  private generateVideoTable({ video_path, video_name }: VideoInfo): VideoModel {
    return {
      id: uuidv4(),
      video_path,
      video_name
    };
  }

  async delete(paths) {
    const arr: any[] = [];
    for (let i = 0; i < paths.length; i++) {
      arr.push(await unlinkFile(paths[i]));
    }
    return arr;
  }

  async checkAll({ sort = 'time', limit = 20, page = 1 }) {
    console.log(sort, limit, page);
  }
}

export default Video;

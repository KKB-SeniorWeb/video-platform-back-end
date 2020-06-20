import { Service } from 'egg';
import { unlinkFile } from '../utils/unlinkFile';
import { v4 as uuidv4 } from 'uuid';

interface VideoModel {
  id: string;
  video_name: string;
  video_path: string;
  video_cover: string;
}

interface VideoInfo {
  video_path: string;
  video_name: string;
  video_cover: string;
}

class Video extends Service {
  async upload({ video_path, video_name, video_cover }: VideoInfo) {
    const { ctx } = this;
    return await ctx.model.Video.create(Video.generateVideoTable({ video_path, video_name, video_cover }));
  }

  private static generateVideoTable({ video_path, video_name, video_cover }: VideoInfo): VideoModel {
    return {
      id: uuidv4(),
      video_path,
      video_name,
      video_cover
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

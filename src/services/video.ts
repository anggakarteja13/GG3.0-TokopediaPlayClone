import User from "../models/User";
import Video from "../models/Video";
import { pagination } from "../utils/functions";
import { CreateVideo, VideoDocument } from "../types/video";

class VideoServices {
    static async getVideoById(videoId: string): Promise<{}|any> {
        const searchQuery = {id: videoId};
        const selectQuery = [
            'id',
            'title',
            'userId',
            'videoUrl',
            'thumbnailUrl'
        ];
        const populateQuery = {
            path: 'userId',
            select: 'userName',
            localField: 'userId',
            foreignField: 'id',
            model: User
        };
        const video = await Video
            .findOne(searchQuery, selectQuery)
            .populate(populateQuery);

        return video;
    }

    static async getVideoByUrl(videoUrl: string): Promise<{}|any> {
        const searchQuery = { videoUrl };
        const selectQuery = [
            'id'
        ];
        const video = await Video.findOne(searchQuery, selectQuery);

        return video;
    }

    static async getAllVideo(
        page: string|null|undefined,
        limit: string|null|undefined,
        titleQuery: string|null|undefined
    ): Promise<{data: VideoDocument[], totalPages: number, currentPage: number}|any> {
        const { pageNum, limitNum, skipNum } = pagination(page, limit);
        const searchQuery = (titleQuery) ? { title: { $regex: titleQuery, $options: 'i' } } : {};
        const selectQuery = [
            'id',
            'title',
            'userId',
            'videoUrl',
            'thumbnailUrl'
        ];
        const populateQuery = {
            path: 'userId',
            select: 'userName',
            localField: 'userId',
            foreignField: 'id',
            model: User
        };
        const videos = await Video
            .find(
                searchQuery,
                selectQuery,
                { skip: skipNum, limit: limitNum }
            )
            .populate(populateQuery);
        const count = await Video.countDocuments();

        return {
            videos,
            totalPages: Math.ceil(count / limitNum),
            currentPage: pageNum
        };
    }

    static async addVideo(data: CreateVideo, userId: string): Promise<VideoDocument|any> {
        const createData: CreateVideo = {
            userId,
            thumbnailUrl: data.thumbnailUrl,
            videoUrl: data.videoUrl,
            title: data.title
        }
        const newVideo = await Video.create(createData);
        return {
            id: newVideo.id,
            userId: newVideo.userId,
            thumbnailUrl: newVideo.thumbnailUrl,
            videoUrl: newVideo.videoUrl,
            title: newVideo.title
        };
    }
}

export default VideoServices;

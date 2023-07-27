import DB from "../db";
import User from "../models/User";
import { CreateVideo } from "../types/video";
import { pagination } from "../utils/functions";
import Video, { VideoDocument } from "../models/Video";

class VideoServices {
    static async getVideo(videoUrl: string): Promise<{}|any> {
        try {
            const selectQuery = [
                '_id',
                'title',
                'userId',
                'videoUrl',
                'thumbnailUrl'
            ];
            const populateQuery = {
                path: 'userId',
                select: ['userName'],
                model: User
            };
            const query = (videoUrl) ? {videoUrl} : {};
            const video = await Video
                .findOne(query, selectQuery)
                .populate(populateQuery);

            return video;
        } catch (error) {
            return {error};
        }
    }

    static async getAllVideo(page: string|null|undefined, limit: string|null|undefined, titleQuery: string|null|undefined): 
        Promise<{data: VideoDocument[], totalPages: number, currentPage: number}|any> {
        try {
            const { pageNum, limitNum, skipNum } = pagination(page, limit);
            const searchQuery = (titleQuery) ? {title: { $regex: titleQuery, $options: 'i' }} : {};
            const selectQuery = [
                '_id',
                'title',
                'userId',
                'videoUrl',
                'thumbnailUrl'
            ];
            const populateQuery = {
                path: 'userId',
                select: 'userName',
                localField: 'userId',
                foreignField: '_id',
                model: User
            };
            const videos = await Video
                .find(searchQuery, selectQuery)
                .populate(populateQuery)
                .limit(limitNum)
                .skip(skipNum);
            const count = await Video.countDocuments();

            return {
                videos,
                totalPages: Math.ceil(count / limitNum),
                currentPage: pageNum
            };
        } catch (error) {
            return {error};
        }
    }

    static async addVideo(data: CreateVideo): Promise<VideoDocument|any> {
        const session = await DB.conn.startSession();
        try {
            session.startTransaction();
            const newVideo = await Video.create(data);
            await session.commitTransaction();
            return {
                _id: newVideo._id,
                thumbnailUrl: newVideo.thumbnailUrl,
                videoUrl: newVideo.videoUrl,
                title: newVideo.title
            };
        } catch (error) {
            await session.abortTransaction();
            return {error};
        } finally {
            await session.endSession();
        }
    }
}

export default VideoServices;

import { Server } from 'socket.io';
import config from '../config/config.env';
import { Server as HTTPServer } from 'http';
import CommentServices from '../services/comment';

export default function SocketIOHandler (server: HTTPServer, corsOrigin: string) {
    const io = new Server(server, {
        cors: {
            origin: corsOrigin,
            methods: ['GET', 'POST']
        }
    });
    console.log(`   Socket IO is live on http://localhost:${config.port}`);
  
    io.on('connection', (socket: any) => {
        socket.on('get_comment', async (payload: { room: string }) => {
            try {
                socket.join(payload.room);
                const comments = await CommentServices.getAllComment(payload.room);
                io.to(socket.id).emit('comment', { comments, socketId: socket.id });
            } catch (error) {
                console.error(error);
            }
        });

        socket.on('send_comment', async (payload: { room: string, userName: string, comment: string }) => {
            try {
                await CommentServices.addComment({
                    userName: payload.userName,
                    videoId: payload.room,
                    comment: payload.comment
                });
                io.to(payload.room).emit('comment', {
                    userName: payload.userName,
                    comment: payload.comment
                });
            } catch (error) {
                console.error(error);
            }
        });

        socket.on('leave_room', (room: string) => {
            socket.leave(room);
            io.disconnectSockets(true);
        });
    });
};

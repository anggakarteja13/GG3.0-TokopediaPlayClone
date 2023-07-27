import { Connection, connect } from "mongoose";
import { config } from "../config/config.env";

class DB {
    static conn: Connection

    static async startConnection(): Promise<boolean|undefined> {
        try {
            const status = await connect(config.db.uri,{
                dbName: config.db.name,
                serverSelectionTimeoutMS: 2000
            });
            if (status.connection.readyState === 1) {
                this.conn = status.connection;
                console.log('   DB is online');
                return true;
            }
        } catch (error) {
            console.log('   Please check DB URI & Restart Server');
            return false;
        }
    }
}

export default DB;

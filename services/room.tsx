import { getRequest, postRequest } from './common'

export interface Room {
	name:string
	description:string
	limitUsers:Number
    ispublic:Number
}


export class RoomService {
    // REF: singleton pettern: https://typescript-jp.gitbook.io/deep-dive/main-1/singleton
    private static _instance: RoomService
    static getInstance(): RoomService {
      if (!RoomService._instance) {
        RoomService._instance = new RoomService()
      }
      return RoomService._instance
    }
  
    public async getAll(): Promise<any> {
      return getRequest("/threads")
    }
  
    public async create(room: Room): Promise<any> {
      const newUser = {
        name : room.name,
        description : room.description,
        limit_users : room.limitUsers,
        is_public : room.ispublic,
      }
      return postRequest("/threads", newUser)
    }
  }
  
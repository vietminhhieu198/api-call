import { endPoint } from "../common/constants/adminAPI";
import { IComment } from "../common/interfaces/CommentModel";
import { IUser } from "../common/interfaces/UserModel";
import AxiosClient from "./axiosConnection";

class AdminService {
  //USER
  async getUserList(): Promise<IUser[]> {
    const { data } = await AxiosClient.get(`${endPoint.USER}`);
    return data;
  }
  async deleteUserById(id: number): Promise<IUser[]> {
    const { data } = await AxiosClient.delete(`${endPoint.USER}/${id}`);
    return data;
  }
  async getUserDetailById(id: number): Promise<IUser[]> {
    const { data } = await AxiosClient.get(`${endPoint.USER}/${id}`);
    return data;
  }
  async updateUserById(params: IUser, id: number): Promise<IUser[]> {
    const { data } = await AxiosClient.put(`${endPoint.USER}/${id}`, params);
    return data;
  }
  async addNewUser(params: IUser): Promise<IUser[]> {
    const { data } = await AxiosClient.post(`${endPoint.USER}`, params);
    return data;
  }

  //COMMENT
  async getCommentList(): Promise<IComment[]> {
    const { data } = await AxiosClient.get(`${endPoint.COMMENT}`);
    return data;
  }
  async deleteCommentById(id: number): Promise<IComment[]> {
    const { data } = await AxiosClient.delete(`${endPoint.COMMENT}/${id}`);
    return data;
  }
  async getCommentDetailById(id: number): Promise<IComment[]> {
    const { data } = await AxiosClient.get(`${endPoint.COMMENT}/${id}`);
    return data;
  }
  async updateCommentById(params: IComment, id: number): Promise<IComment[]> {
    const { data } = await AxiosClient.put(`${endPoint.COMMENT}/${id}`, params);
    return data;
  }
  async addNewComment(params: IComment): Promise<IComment[]> {
    const { data } = await AxiosClient.post(`${endPoint.COMMENT}`, params);
    return data;
  }
}

export default new AdminService();

import { endPoint } from "../common/constants/adminAPI";
import { IUser } from "../common/interfaces/UserModel";
import AxiosClient from "./axiosConnection";

class AdminService {
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
}

export default new AdminService();

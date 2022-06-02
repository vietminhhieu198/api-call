import axios from "axios";
import { SERVICE_API } from "../common/constants/adminAPI";

const AxiosClient = axios.create({ baseURL: SERVICE_API });

export default AxiosClient;

import request from '../utils/request';
/**
 * @description 获取
 */
export const apiGet = async () => {
  const res: ResponseType = await request(`/api/get`);
  return res;
};

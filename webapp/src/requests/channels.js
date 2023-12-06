import instanceAPI from "./axiosconfig";
import { queryFilter } from "@/utils/requests";
import { pagination } from '@/constants/pagination';

export const getChannelsAPI = (
  pageNumber = pagination.number,
  pageSize = pagination.size,
  filters = []
) => {
  const query = queryFilter(filters);

  return instanceAPI.get(
    `/channelss?page[number]=${pageNumber}&page[size]=${pageSize}${query}`
  );
};

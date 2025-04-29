import { API_URLS } from "@config-global";

type TransformResponse = {
  data: any;
  total: number;
};

export const transformResponse = (
  apiUrl: string,
  data: any
): TransformResponse => {
  if (apiUrl === API_URLS.heimdallUrl || apiUrl === API_URLS.frostUrl) {
    return {
      data: data?.data,
      total: data?.meta?.total || data?.data?.length || 0,
    };
  }

  if (apiUrl === API_URLS.meridianUrl) {
    return {
      data: data?.servers || data,
      total: data?.count || data?.servers?.length || 0,
    };
  }

  return {
    data,
    total: data?.length || 0,
  };
};

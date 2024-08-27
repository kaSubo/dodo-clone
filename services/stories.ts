import { StoriesParams } from '@/types/types';
import { axiosInstance } from './instance';

export const getStories = async () => {
	return (await axiosInstance.get<StoriesParams[]>('/stories')).data;
};
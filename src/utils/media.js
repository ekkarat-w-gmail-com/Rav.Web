// @flow

const VIDEO_TYPES = ['video/mp4'];
const IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

export const isVideo = (mediaType: string) => VIDEO_TYPES.includes(mediaType);
export const isImage = (mediaType: string) => IMAGE_TYPES.includes(mediaType);

export interface ChapterImagesResponse {
    result: string;
    baseUrl: string;
    chapter: {
        hash: string;
        data: string[];
        dataSaver: string[];
    };
}
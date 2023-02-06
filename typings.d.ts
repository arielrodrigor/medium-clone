import {TypedObject} from "sanity";

export interface Post{
    _id: string;
    title: string;
    author: {
        name: string;
        imageUrl: string;
    };
    body: [TypedObject];
    slug: {
        current: string;
    };
    imageUrl: string;
    _createdAt: string;


}
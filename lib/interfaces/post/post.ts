import { Timestamp } from "firebase/firestore";

export interface Post {
  id: string;
  tags: string[];
  title: string;
  author: string;
  version: number;
  markdownFile: Blob;
  createdAt: number;
  isPublished: boolean;
}

export interface PostMetadata extends Omit<Post, "markdownFile"> {
  markdownFileURI: string;
}

export interface ProcessedPost extends Omit<Post, "markdownFile"> {
  processedMarkdownHTML: string;
}

export interface PostMdFile {
  markdownFile: Blob;
}

export interface FirestoreConverterPostMetadata
  extends Omit<Post, "markdownFile" | "createdAt"> {
  markdownFileURI: string;
  createdAt: Timestamp;
}

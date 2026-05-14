import type { Post } from "../types/Post";

export interface User {
  username: string;   
  fullName: string;   
  bio: string;      
  avatar: string;   
  followers: number;  
  following: number;  
  posts: Post[]; 
}


export const currentUser: User = {
  username: "Nico_09",
  fullName: "Nicolas Schnaider",
  bio: "Aguante los gatos | Buenos Aires, Argentina",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nicolas",
  followers: 1204,
  following: 348,
  posts: [],
};
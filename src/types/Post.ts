export interface CatImage {
  id: string;   
  url: string; 
}

export interface Post {
  id: string;        
  imageUrl: string;   
  username: string;   
  likes: number;      
  liked: boolean;    
  description: string;
  date: string;        
  comments: Comment[]; 
}

export interface Comment {
  username: string; 
  text: string;     
}
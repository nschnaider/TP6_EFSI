// data/user.ts
// ¿Para qué sirve? Guarda los datos del usuario "logueado" de forma simulada.
// En una app real estos datos vendrían de un servidor con autenticación.
// Los separamos aquí para no mezclar datos con lógica de componentes.

// Importamos la interface que creamos en types/Post.ts
import type { Post } from "../types/post";

// Interface para el usuario — describe qué datos tiene un perfil
export interface User {
  username: string;   // nombre de usuario
  fullName: string;   // nombre completo
  bio: string;        // biografía
  avatar: string;     // URL de la foto de perfil
  followers: number;  // cantidad de seguidores
  following: number;  // cantidad de seguidos
  posts: Post[];      // publicaciones del usuario (array de Post)
}

// Datos del usuario logueado — todo simulado (hardcoded)
export const currentUser: User = {
  username: "cat_lover_99",
  fullName: "Valentina López",
  bio: "🐱 Amante de los gatos | 📸 Fotógrafa aficionada | Buenos Aires, Argentina",
  // Usamos una foto de placeholder como avatar
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cat_lover",
  followers: 1204,
  following: 348,
  posts: [], // Se llenará dinámicamente desde App.tsx
};
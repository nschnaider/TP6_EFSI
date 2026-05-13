// types/Post.ts
// ¿Para qué sirve? Define la "forma" de los datos que usamos en toda la app.
//
// TypeScript vs JavaScript:
//   En JS podés escribir post.lieks y nadie te avisa del error.
//   En TS, si escribís post.lieks te avisa de inmediato: "lieks no existe".
//
// Una "interface" es como un molde: le decís a TS exactamente
// qué propiedades tiene un objeto y de qué tipo es cada una.

// Así se ve la respuesta de The Cat API:
// { id: "abc", url: "https://..." }
// Definimos exactamente eso:
export interface CatImage {
  id: string;   // id es un texto (string)
  url: string;  // url es un texto (string)
}

// Post es lo que nosotros construimos internamente.
// Tomamos la imagen de la API y le agregamos datos simulados.
export interface Post {
  id: string;          // identificador único del post
  imageUrl: string;    // URL de la foto del gato
  username: string;    // nombre del usuario que "publicó"
  likes: number;       // cantidad de likes (número)
  liked: boolean;      // ¿el usuario actual dio like? (verdadero/falso)
  description: string; // texto de la publicación
  date: string;        // fecha simulada como texto
  comments: Comment[]; // array (lista) de comentarios
}

// Comment es la forma de cada comentario
export interface Comment {
  username: string; // quién comentó
  text: string;     // qué escribió
}
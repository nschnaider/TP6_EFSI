// services/api.ts
// ¿Para qué sirve? Es el único lugar de la app donde hablamos con la API externa.
// Si mañana cambia la URL de la API, solo modificamos este archivo.
//
// Axios vs fetch:
//   fetch es nativo del navegador, pero axios tiene mejor manejo de errores,
//   interceptores, y cancela requests automáticamente. Es más cómodo.

import axios from "axios";
import type { CatImage } from "../types/post";

// URL base de The Cat API — gratuita, no requiere API key para uso básico
const CAT_API_URL = "https://api.thecatapi.com/v1";

// Creamos una instancia de axios con la URL base ya configurada
// Así no repetimos la URL en cada llamada
const apiClient = axios.create({
  baseURL: CAT_API_URL,
});

// Función que busca imágenes de gatos
// ": Promise<CatImage[]>" significa que esta función devuelve
// una Promesa que, cuando se resuelve, contiene un array de CatImage
export const fetchCatImages = async (limit: number = 12): Promise<CatImage[]> => {
  // "limit: number = 12" significa:
  //   - limit es de tipo number (TypeScript)
  //   - Si no se pasa un valor, por defecto usa 12 (JavaScript)

  // Hacemos GET a /images/search con el parámetro limit
  const response = await apiClient.get<CatImage[]>("/images/search", {
    params: { limit },
    // <CatImage[]> le dice a TypeScript qué tipo de datos esperamos
    // Si la API devuelve algo diferente, TS nos avisa
  });

  // response.data es el array de imágenes que devuelve la API
  return response.data;
};
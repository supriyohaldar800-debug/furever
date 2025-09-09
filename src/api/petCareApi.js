import appwriteClient from './appwrite';

const DATABASE_ID = '68bfccfd0035b64f8d76'; // Replace with your Database ID

import axios from "axios";

const ENDPOINT = "https://cloud.appwrite.io/v1";
const PROJECT_ID = "68bfcb1000205e7ebf41";
const API_KEY = import.meta.env.VITE_API_KEY; //



// Pet Categories
export const getPetCategories = async () => {
  try {
    const response = await appwriteClient.get(
      `/databases/${DATABASE_ID}/collections/petcategorie/documents`
    );
    return response.data.documents;
  } catch (error) {
    console.error('Error fetching pet categories:', error);
    throw error;
  }
};







export const getPetCareInfo = async (petType) => {
  try {
    const response = await axios.get(
      `${ENDPOINT}/databases/${DATABASE_ID}/collections/caredata/documents`,
      {
        headers: {
          "X-Appwrite-Project": PROJECT_ID,
          "X-Appwrite-Key": API_KEY, // ⚠️ only use server-side
        },
        params: {
          queries: [
            JSON.stringify({
              method: "equal",
              attribute: "petType",
              values: [petType],
            }),
          ],
        },
      }
    );

    return response.data.documents[0] || null;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    throw error;
  }
};




export const getProducts = async (category = null) => {
  try {
    const params = category ? { queries: [`equal("category","${category}")`] } : {};
    const response = await appwriteClient.get(
      `/databases/${DATABASE_ID}/collections/shopcategories/documents`,
      { params }
    );
    return response.data.documents;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Vets
export const getVets = async () => {
  try {
    const response = await appwriteClient.get(
      `/databases/${DATABASE_ID}/collections/vets/documents`
    );
    return response.data.documents;
  } catch (error) {
    console.error('Error fetching vets:', error);
    throw error;
  }
};

// Example: Create a new product (POST)
// export const createProduct = async (productData) => {
//   try {
//     const response = await appwriteClient.post(
//       `/databases/${DATABASE_ID}/collections/Products/documents`,
//       productData
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error creating product:', error);
//     throw error;
//   }
// };



export const createProduct = async (productData) => {
  try {
    const response = await axios.post(
      `${ENDPOINT}/databases/68bfccfd0035b64f8d76/collections/shopcategories/documents`,
      {
        documentId: "unique()", // same as ID.unique() in SDK
        data: productData,
      },
      {
        headers: {
          "X-Appwrite-Project": PROJECT_ID,
          "X-Appwrite-Key": import.meta.env.VITE_API_KEY, // ⚠️ only safe on backend
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating product:", error.response?.data || error.message);
    throw error;
  }
};

import axios from "axios";


const sendVideoToML = async (filePath) => {

  try {

    const response = await axios.post(
      "http://localhost:8000/process",
      {
        filePath,
      }
    );


    return response.data;

  } catch (error) {

    console.log("ML Service Error:", error.message);

    throw error;

  }

};


export {
  sendVideoToML,
};
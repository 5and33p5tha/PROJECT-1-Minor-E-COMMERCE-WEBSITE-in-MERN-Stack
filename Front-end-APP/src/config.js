// export const API= process.env.API_SERVER_URL
//This method is not working for some reason export const API = process.env.API_SERVER_URL || "http://localhost:8000/api";
//So, Alternative

// export const API = "http://localhost:8000/api";
//The above code is running without .env

//Now TO MAKE USE Of ENV
export const API = process.env.REACT_APP_API_URL;
//BUT NEED TO RESTART THE SERVER TO MAKE IT WORK

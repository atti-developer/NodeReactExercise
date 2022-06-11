"use strict";

module.exports = {
  // MongoDB Connection String
  mongoURI: "mongodb://localhost:27017/glossaryDB",
  

  // Server Configuration
  expressPort: 3090,
  baseUrl: "http://localhost:3090",
  rootPath: "F:\\AttiModules\\SystemTest\\Node_Freelance_Task",

  // Project Configuration
  projectName: "glossary CRUD Module",
  defaultTimezone: "Asia/Kolkata",
  defaultCountryCode: "+91",
  allowedLanguages: ["en", "ar"],

  // Webservices Security Configuration
  validateApiAccess: false,
  apiAccessKey: "",
  apiAccessTimeout: 60, // In seconds

  // JWT Authentication Configuration
  validateAuthorization: true,
  jwtSecretKey: "glossary123",
  appLoginSessionExpiryTime: 7 * 24 * 60, // in minutes
  allowMultiSessions: true,

  //Default near by store redius in km
  maxDistance: 15,

   
};

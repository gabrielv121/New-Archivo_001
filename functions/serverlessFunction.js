// exampleFunction.js

// The serverless function handler
exports.handler = async (event, context) => {
    try {
      // Your serverless function logic here
      // Access event and context objects for request and runtime information
      // ...
      
      // Return a response
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Hello from Netlify Functions!' })
      };
    } catch (error) {
      // Handle any errors
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' })
      };
    }
  };
  
import { ZodError } from "zod";

export const validateFormData = (schema) => (req, res, next) => {
  try {
   
    const parsedData = schema.parse(req.body);
    req.body = parsedData; 
    next(); 
  } catch (error) {
    if (error instanceof ZodError) {
     
      const errorMessages = error.issues.map((issue) => ({
        message: `${issue.path.join(".")} is ${issue.message}`, 
      }));
      return res.status(400).json({
        error: "Validation failed",
        details: errorMessages,
      });
    }
    next(error); 
  }
};


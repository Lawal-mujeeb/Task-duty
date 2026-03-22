import { useState,  } from "react";
import { AuthContext } from "./index.js";
// import { useQuery } from "@tanstack/react-query";

export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null); 
  const [user, setUser] = useState(null);
  




  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

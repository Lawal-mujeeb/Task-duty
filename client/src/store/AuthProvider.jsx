import { useState, useEffect } from "react";
import { AuthContext } from "./index.js";

export default function AuthProvider({ children }) {
  // ✅ Load saved auth from localStorage on first render
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ✅ Save token whenever it changes
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  // ✅ Save user whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // ✅ Logout helper
  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// import { useState,  } from "react";
// import { AuthContext } from "./index.js";
// // import { useQuery } from "@tanstack/react-query";

// export default function AuthProvider({ children }) {
//   const [accessToken, setAccessToken] = useState(null); 
//   const [user, setUser] = useState(null);
  




//   return (
//     <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

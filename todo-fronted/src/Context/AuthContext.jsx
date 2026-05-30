import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [userId, setUserId] = useState(
    localStorage.getItem("userId")
  );

  return (
    <AuthContext.Provider
      value={{
        userId,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
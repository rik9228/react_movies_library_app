import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../../firebase";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribed();
    };
  }, []);

  if (loading) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={80} />
        </Box>
      </>
    );
  } else {
    return (
      <AuthContext.Provider value={{ user }}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }
}

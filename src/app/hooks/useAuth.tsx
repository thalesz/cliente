// useAuth.ts
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAuth = (): any=> {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export default useAuth;
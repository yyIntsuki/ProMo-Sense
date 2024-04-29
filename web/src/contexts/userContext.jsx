import { createContext, useState } from "react";

const UserContext = createContext({ currentUser: null, setCurrentUser: () => null });

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const value = { currentUser, setCurrentUser }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }
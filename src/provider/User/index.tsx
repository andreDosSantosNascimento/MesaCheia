import {
   createContext,
   useContext,
   useState,
   ReactNode,
} from "react";
import { useAuth } from "../Auth";
import jwt_decode from "jwt-decode";
import { mesaCheiaApi } from "../../services";
import { User } from "../../types/user";

interface UserData {
   user: User;
   getUserProfile: () => void;
};

interface UserProviderData {
   children: ReactNode;
};

interface DecodedData {
   email: string;
   iat: number;
   exp: number;
   sub: string;
};

const UserContext = createContext<UserData>({} as UserData);

export const UserProvider = ({ children }: UserProviderData) => {

   const { token } = useAuth();

   const [id, setId] = useState('');
   const [user, setUser] = useState({});

   const getUserProfile = () => {
      const decoded: DecodedData = jwt_decode(token);
      setId(decoded.sub);
      mesaCheiaApi
         .get(`users/${id}`, {headers: {Authorization: `Bearer ${token}`}})
         .then((response) => setUser(response.data))
         .catch((error) => console.log(error));
   };

   return (
      <UserContext.Provider value={{user, getUserProfile}}>
         {children}
      </UserContext.Provider>
   )
};

export const useUser = () => useContext(UserContext);
import { useContext, useEffect, useState } from 'react';

import UserContext from '../contexts/UserContext';
import { userService } from '../services/users/user.service';

export default function useAuthenticator() {
  const { user, setUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const user = await userService.fetchCurrentUser();
        setUser(user.data.result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [setUser, user]);

  return { user, isLoading };
}

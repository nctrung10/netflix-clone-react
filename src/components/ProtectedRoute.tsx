import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../store/auth-context';

type PropsType = {
  children?: React.ReactNode;
};

const ProtectedRoute = ({ children }: PropsType) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to='/login' />;
  } else {
    return <>{children}</>;
  }

};

export default ProtectedRoute;
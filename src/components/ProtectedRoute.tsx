import { Navigate } from 'react-router-dom';

import { UserAuth } from '../store/auth-context';

type PropsType = {
  children?: React.ReactNode;
};

const ProtectedRoute = ({ children }: PropsType) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to='/' />;
  } else {
    return <>{children}</>;
  }

};

export default ProtectedRoute;
import React from 'react';

import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

const RootNavigator = () => {
  //   const isLoggedIn = useSelector(
  //     (state: any) => state.auth.isLoggedIn
  //   );
  const isLoggedIn = false;
  return <>{isLoggedIn ? <TabNavigator /> : <AuthNavigator />}</>;
};

export default RootNavigator;

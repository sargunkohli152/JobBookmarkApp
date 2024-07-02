// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from "./navigation/AppNavigator";
import CustomErrorBoundary from './screens/error-screens/CustomErrorBoundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <CustomErrorBoundary>
            <QueryClientProvider client={queryClient}>
              <AppNavigator />
            </QueryClientProvider>
          </CustomErrorBoundary>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

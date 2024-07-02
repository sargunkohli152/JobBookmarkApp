import React from "react";
import { View, Text, Button } from "react-native";
import { ErrorBoundary } from "react-error-boundary";
import { FALLBACK_SCREEN_RETRY, FALLBACK_SCREEN_TEXT } from "./constants";

interface CustomErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>{FALLBACK_SCREEN_TEXT}: {error.message}</Text>
    <Button title={FALLBACK_SCREEN_RETRY} onPress={resetErrorBoundary} />
  </View>
);

const CustomErrorBoundary: React.FC<CustomErrorBoundaryProps> = ({ children }) => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // we can reset the state of the app here so the error UI is no longer displayed
      // Maybe clear data, reload a page, etc.
      // for the time being, I am logging it on console
      console.log("Error boundary reset.");
    }}
  >
    {children}
  </ErrorBoundary>
);

export default CustomErrorBoundary;

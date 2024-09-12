"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { theme } from "./theme";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<CacheProvider>
				<ChakraProvider theme={theme}>{children}</ChakraProvider>
			</CacheProvider>
		</QueryClientProvider>
	);
}

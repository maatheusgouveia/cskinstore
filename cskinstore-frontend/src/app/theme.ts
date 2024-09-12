import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	config: {
		initialColorMode: "dark",
		useSystemColorMode: false,
	},
	styles: {
		global: {
			body: {
				bg: "gray.800",
				color: "white",
			},
		},
	},
	components: {
		Select: {
			baseStyle: {
				field: {
					bgColor: "#393939",
					color: "#fff",
					borderColor: "#555",
				},
			},
		},
	},
	colors: {
		gray: {
			800: "#393939",
			600: "#555",
		},
		white: "#fff",
	},
});

export { theme };

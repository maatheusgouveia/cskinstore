import Image from "next/image";
import { Box } from "@chakra-ui/react";

import logo from "@/assets/images/logo.webp";

export function Header() {
	return (
		<header>
			<Box p={8}>
				<Image src={logo} alt="cskinstore logo" />
			</Box>
		</header>
	);
}

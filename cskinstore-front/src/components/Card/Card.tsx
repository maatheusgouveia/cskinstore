import Image from "next/image";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

import { Skin } from "@/interfaces/skin";

interface CardProps {
	data: Skin;
}
export function Card({ data }: CardProps) {
	return (
		<Box
			key={data.id}
			bg="#2e2e2e"
			borderRadius="lg"
			overflow="hidden"
			boxShadow="md"
			transition="transform 0.3s, box-shadow 0.3s"
			_hover={{
				transform: "scale(1.05)",
				boxShadow: "xl",
			}}
			p={4}
			textAlign="center"
			maxW={{ base: "100%", md: "270px" }}
			mb={4}
		>
			<Box
				overflow="hidden"
				borderRadius="md"
				transition="transform 0.3s"
				_hover={{
					transform: "scale(1.1)",
				}}
				maxH={300}
				maxW={300}
			>
				<Image
					src={data.image}
					alt={data.name}
					width={300}
					height={300}
					style={{ borderRadius: "8px" }}
				/>
			</Box>

			<Heading
				as="h3"
				color="#fff"
				fontWeight="bold"
				mt={3}
				fontSize="lg"
			>
				{data.name}
			</Heading>

			<Text color="#FE8400" fontWeight="bold">
				{data.price.toLocaleString("pt-BR", {
					style: "currency",
					currency: "BRL",
				})}
			</Text>

			<Text color="#ccc">{data.category}</Text>

			<Text color="#ccc" fontSize="sm">
				Criado em {new Date(data.createdAt).toLocaleDateString("pt-BR")}
			</Text>

			<Text color="#ccc" fontSize="sm">
				Atualizado em{" "}
				{new Date(data.updatedAt).toLocaleDateString("pt-BR")}
			</Text>

			<Button bgColor="#FE8400" color="#fff" fontWeight="bold" mt={4}>
				Comprar
			</Button>
		</Box>
	);
}

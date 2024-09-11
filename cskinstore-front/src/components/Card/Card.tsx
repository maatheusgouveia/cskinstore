import Image from "next/image";
import { Box, Button } from "@chakra-ui/react";

import { Skin } from "@/interfaces/skin";

interface CardProps {
	data: Skin;
}
export function Card({ data }: CardProps) {
	if (!data.id) return;

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
			maxW="300px"
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

			<h3
				style={{
					color: "#fff",
					fontWeight: "bold",
					marginTop: "10px",
				}}
			>
				{data.name}
			</h3>

			<p
				style={{
					color: "#FE8400",
					fontWeight: "bold",
				}}
			>
				{data.price.toLocaleString("pt-BR", {
					style: "currency",
					currency: "BRL",
				})}
			</p>

			<p style={{ color: "#ccc" }}>{data.category}</p>

			<p style={{ color: "#ccc", fontSize: "12px" }}>
				Criado em {new Date(data.createdAt).toLocaleDateString("pt-BR")}
			</p>
			<p style={{ color: "#ccc", fontSize: "12px" }}>
				Atualizado em{" "}
				{new Date(data.updatedAt).toLocaleDateString("pt-BR")}
			</p>

			<Button bgColor="#FE8400" textColor="#fff" fontWeight="bold" mt={4}>
				Comprar
			</Button>
		</Box>
	);
}

import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { Button, Grid, GridItem, Input, Select } from "@chakra-ui/react";

const categories = ["Electronics", "Clothing", "Books", "Home", "Toys"];

export function Filter() {
	return (
		<div>
			<Grid templateColumns="1fr 1fr 1fr auto auto" gap={6}>
				<GridItem w="100%" h="10">
					<Select
						placeholder="Selecione a categoria"
						bgColor="#393939"
						color="#fff"
						borderColor="#555"
					>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</Select>
				</GridItem>

				<GridItem w="100%" h="10">
					<Select
						placeholder="Select option"
						bgColor="#393939"
						color="#fff"
						borderColor="#555"
					>
						<option value="option1">Option 1</option>
						<option value="option2">Option 2</option>
						<option value="option3">Option 3</option>
					</Select>
				</GridItem>

				<GridItem w="100%" h="10">
					<Input
						placeholder="Encontre as skins que você procura"
						bgColor="#393939"
						color="#fff"
						borderColor="#555"
					/>
				</GridItem>

				<GridItem h="10">
					<Button
						bgColor="#FE8400"
						textColor="#fff"
						fontWeight="bold"
					>
						Pesquisar
					</Button>
				</GridItem>

				<GridItem h="10">
					<Button
						bgColor="transparent"
						textColor="#FE8400"
						fontWeight="bold"
					>
						<FaArrowRightArrowLeft
							style={{ transform: "rotate(90deg)" }}
						/>
					</Button>
				</GridItem>
			</Grid>
		</div>
	);
}

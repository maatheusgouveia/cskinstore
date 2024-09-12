"use client";

import { Field, ErrorMessage, useFormikContext } from "formik";
import {
	Button,
	Grid,
	GridItem,
	Input,
	Select,
	Flex,
	Tooltip,
} from "@chakra-ui/react";

import { categories } from "@/constants/categories";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

interface FormValues {
	category: string;
	minPrice: string;
	maxPrice: string;
	searchTerm: string;
	orderBy: "asc" | "desc";
}

interface FilterProps {
	isLoading: boolean;
	onSubmit: (values: FormValues) => void;
	initialValues?: FormValues;
}

export function LargeScreenFilter({ isLoading }: FilterProps) {
	const { resetForm, submitForm, values, setFieldValue } =
		useFormikContext<FormValues>();

	function handleResetForm() {
		resetForm();
		submitForm();
	}

	async function handleOrder() {
		await setFieldValue(
			"orderBy",
			values.orderBy === "asc" ? "desc" : "asc"
		);

		submitForm();
	}

	return (
		<Grid templateColumns="1fr 1fr 1fr auto auto" gap={6}>
			<GridItem w="100%" h="10">
				<Field
					as={Select}
					name="category"
					placeholder="Selecione a categoria"
				>
					{categories.map((category) => (
						<option
							key={category}
							value={category}
							style={{ backgroundColor: "#393939" }}
						>
							{category}
						</option>
					))}
				</Field>
				<ErrorMessage name="category" component="div" />
			</GridItem>

			<GridItem w="100%" h="10">
				<Flex gap={4} alignItems="center">
					<Field
						as={Input}
						name="minPrice"
						placeholder="Digite o valor mínimo"
					/>
					-
					<Field
						as={Input}
						name="maxPrice"
						placeholder="Digite o valor máximo"
					/>
				</Flex>
				<ErrorMessage name="minPrice" component="div" />
				<ErrorMessage name="maxPrice" component="div" />
			</GridItem>

			<GridItem w="100%" h="10">
				<Field
					as={Input}
					name="searchTerm"
					placeholder="Encontre as skins que você procura"
				/>
				<ErrorMessage name="searchTerm" component="div" />
			</GridItem>

			<GridItem h="10">
				<Button
					bgColor="#FE8400"
					textColor="#fff"
					fontWeight="bold"
					type="submit"
					isLoading={isLoading}
				>
					Pesquisar
				</Button>
			</GridItem>

			<GridItem h="10">
				<Tooltip label="Limpar filtros">
					<Button
						variant="ghost"
						onClick={handleResetForm}
						textColor="#FE8400"
					>
						X
					</Button>
				</Tooltip>

				<Tooltip
					label={
						values.orderBy === "asc"
							? "Menor para o maior preço"
							: "Maior para o menor preço"
					}
				>
					<Button
						variant="ghost"
						onClick={handleOrder}
						textColor="#FE8400"
					>
						{values.orderBy === "asc" ? (
							<FaArrowUp />
						) : (
							<FaArrowDown />
						)}
					</Button>
				</Tooltip>
			</GridItem>
		</Grid>
	);
}

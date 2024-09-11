"use client";

import * as Yup from "yup";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button, Grid, GridItem, Input, Select, Flex } from "@chakra-ui/react";

const categories = ["Pistol", "Rifle", "Knife", "Sniper"];

// Esquema de validação com Yup
const validationSchema = Yup.object({
	category: Yup.string(),
	minPrice: Yup.number().min(0, "Valor mínimo deve ser maior ou igual a 0"),
	maxPrice: Yup.number()
		.min(0, "Valor máximo deve ser maior ou igual a 0")
		.moreThan(
			Yup.ref("minPrice"),
			"Valor máximo deve ser maior que o mínimo"
		),
	searchTerm: Yup.string(),
});

const initialValues = {
	category: "",
	minPrice: "",
	maxPrice: "",
	searchTerm: "",
};

interface FilterProps {
	isLoading: boolean;
	onSubmit: (values: typeof initialValues) => void;
}

export function Filter({ isLoading, onSubmit }: FilterProps) {
	function handleSubmit(values: typeof initialValues) {
		onSubmit(values);
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{() => (
				<Form>
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
							<Button
								type="button"
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
				</Form>
			)}
		</Formik>
	);
}

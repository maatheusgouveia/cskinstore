"use client";

import { useState } from "react";
import {
	Button,
	Grid,
	GridItem,
	Input,
	Select,
	Flex,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from "@chakra-ui/react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { FaFilter } from "react-icons/fa6";

import { categories } from "@/constants/categories";

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

export function MobileFilter({ isLoading, onSubmit }: FilterProps) {
	const { resetForm } = useFormikContext();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [formValues, setFormValues] = useState(initialValues);

	function handleSubmit(values: typeof initialValues) {
		setFormValues(values);
		onSubmit(values);
		onClose();
	}

	return (
		<>
			<Flex gap={4}>
				<Field
					as={Input}
					name="searchTerm"
					placeholder="Encontre as skins que você procura"
				/>
				<Button
					onClick={onOpen}
					bgColor="#FE8400"
					textColor="#fff"
					fontWeight="bold"
				>
					<FaFilter />
				</Button>
				<Button
					variant="ghost"
					onClick={() => {
						resetForm();
					}}
					textColor="#FE8400"
				>
					x
				</Button>
			</Flex>

			<Modal isOpen={isOpen} onClose={onClose} size="full">
				<ModalOverlay />
				<ModalContent bg="#393939">
					<ModalHeader textColor="#fff">
						<Flex
							justifyContent="space-between"
							alignItems="center"
						>
							Filtrar Skins
							<Button
								variant="ghost"
								onClick={onClose}
								ml={3}
								textColor="#fff"
							>
								x
							</Button>
						</Flex>
					</ModalHeader>
					<ModalBody>
						<GridItem w="100%" h="10" mb={6}>
							<Field
								as={Input}
								name="searchTerm"
								placeholder="Encontre as skins que você procura"
							/>
							<ErrorMessage name="searchTerm" component="div" />
						</GridItem>

						<Grid templateColumns="1fr" gap={6}>
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
											style={{
												backgroundColor: "#393939",
											}}
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
						</Grid>
					</ModalBody>

					<ModalFooter w="100%">
						<Button
							w="100%"
							bgColor="#FE8400"
							textColor="#fff"
							fontWeight="bold"
							type="submit"
							onClick={() => handleSubmit(formValues)}
							isLoading={isLoading}
						>
							Pesquisar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

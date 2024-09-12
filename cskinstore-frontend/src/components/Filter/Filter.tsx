"use client";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useBreakpointValue } from "@chakra-ui/react";
import { MobileFilter } from "./MobileFilter/MobileFilter";
import { LargeScreenFilter } from "./LargeScreenFilter/LargeScreenFilter";

interface FormValues {
	category: string;
	minPrice: string;
	maxPrice: string;
	searchTerm: string;
	orderBy: "asc" | "desc";
}

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

const initialValues: FormValues = {
	category: "",
	minPrice: "",
	maxPrice: "",
	searchTerm: "",
	orderBy: "asc",
};

interface FilterProps {
	isLoading: boolean;
	onSubmit: (values: FormValues) => void;
}

export function Filter({ isLoading, onSubmit }: FilterProps) {
	const isMobile = useBreakpointValue({ base: true, md: false });

	function handleSubmit(values: FormValues) {
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
					{isMobile ? (
						<MobileFilter
							onSubmit={onSubmit}
							isLoading={isLoading}
							initialValues={initialValues}
						/>
					) : (
						<LargeScreenFilter
							isLoading={isLoading}
							onSubmit={onSubmit}
						/>
					)}
				</Form>
			)}
		</Formik>
	);
}

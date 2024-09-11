"use client";

import { Box, Grid } from "@chakra-ui/react";

import { Skin } from "@/interfaces/skin";
import { Card } from "@/components/Card";
import { Filter } from "@/components/Filter";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { QueryTags } from "@/constants/querytags";
import { useState } from "react";

interface Filters {
	category: string;
	minPrice: string;
	maxPrice: string;
	searchTerm: string;
}

export default function Home() {
	const [filters, setFilters] = useState({});

	function handleSubmit(data: Filters) {
		const updatedData = {
			name: data.searchTerm,
			priceMin: data.minPrice,
			priceMax: data.maxPrice,
			category: data.category,
		};

		setFilters(updatedData);
	}

	const { isLoading, data } = useQuery({
		queryKey: [QueryTags.ITEMS, JSON.stringify(filters)],
		queryFn: async () =>
			(await api.get<Skin[]>("items", { params: filters })).data,
	});

	return (
		<main>
			<Box p={8}>
				<Filter isLoading={isLoading} onSubmit={handleSubmit} />

				<section>
					<Grid
						py={8}
						gap={8}
						justifyItems="center"
						templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
					>
						{data?.map((item) => (
							<Card key={item.id} data={item} />
						))}
					</Grid>
				</section>
			</Box>
		</main>
	);
}

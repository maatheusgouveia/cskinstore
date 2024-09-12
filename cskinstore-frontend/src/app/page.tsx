"use client";

import { Flex, Text } from "@chakra-ui/react";

import { Skin } from "@/interfaces/skin";
import { Card } from "@/components/Card";
import { Filter } from "@/components/Filter";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { QueryTags } from "@/constants/querytags";
import { useState } from "react";
import { CardsSkeleton } from "@/components/CardsSkeleton";

interface Filters {
	category: string;
	minPrice: string;
	maxPrice: string;
	searchTerm: string;
	orderBy: string;
}

export default function Home() {
	const [filters, setFilters] = useState({});

	function handleSubmit(data: Filters) {
		const updatedData = {
			name: data.searchTerm,
			priceMin: data.minPrice,
			priceMax: data.maxPrice,
			category: data.category,
			orderBy: data.orderBy,
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
			<Flex p={8} w="100%" direction="column" justifyContent="center">
				<Filter isLoading={isLoading} onSubmit={handleSubmit} />

				<Flex
					py={6}
					gap={6}
					alignItems="center"
					justifyContent={{ base: "center", md: "start" }}
					wrap="wrap"
				>
					{data?.map((item) => (
						<Card key={item.id} data={item} />
					))}

					{data && data?.length < 1 && !isLoading && (
						<Flex w="100%" justifyContent="center" mt="24">
							<Text>Nenhum item encontrado</Text>
						</Flex>
					)}

					{isLoading && <CardsSkeleton />}
				</Flex>
			</Flex>
		</main>
	);
}

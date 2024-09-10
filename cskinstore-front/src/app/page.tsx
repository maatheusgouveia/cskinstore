
import { Box,  Grid,  } from "@chakra-ui/react";

import { Skin } from "@/interfaces/skin";
import { Card } from "@/components/Card";
import { Filter } from "@/components/Filter";

const categories = ["Electronics", "Clothing", "Books", "Home", "Toys"];

function generateItems(numItems = 10) {
	const items = [];

	for (let i = 0; i < numItems; i++) {
		const item = {
			id: crypto.randomUUID(),
			name: `Item ${i + 1}`,
			image: `https://picsum.photos/200/300?random=${i + 1}`,
			category: categories[i % categories.length],
			price: +(10 + i * 1.5).toFixed(2),
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		items.push(item);
	}

	return items;
}

export default function Home() {
	const data: Skin[] = generateItems();

	return (
		<main>
			<Box p={8}>
				<Filter />

				<section>
					<Grid
						py={8}
						gap={8}
						justifyItems="center"
						templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
					>
						{data.map((item) => (
							<Card key={item.id} data={item} />
						))}
					</Grid>
				</section>
			</Box>
		</main>
	);
}

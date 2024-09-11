import { Skeleton } from "@chakra-ui/react";

interface CardsSkeletonProps {
	size?: number;
}

export function CardsSkeleton({ size = 8 }: CardsSkeletonProps) {
	function generateItems() {
		const items = [];

		for (let i = 0; i < size; i++) {
			items.push(
				<Skeleton key={i} height={300} width={270} borderRadius={11} />
			);
		}

		return items;
	}

	return generateItems();
}

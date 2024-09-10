import type { Metadata } from "next";
import localFont from "next/font/local";

import { Header } from "@/components/Header";

import "./globals.css";
import { Providers } from "./providers";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "CSkinStore",
	description:
		"Compre e venda no melhor marketplace automatizado de skins e itens do CS:2. Concorra a skins diariamente. A menor taxa do Brasil.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Providers>
					<Header />

					{children}
				</Providers>
			</body>
		</html>
	);
}

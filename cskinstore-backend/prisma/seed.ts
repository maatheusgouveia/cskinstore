import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const image =
    'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhnwMzJemkV0966m4-PhOf7Ia_ummJW4NE_2LyV89Wt0QewqBE6Z2-lcY6UJlRrMF7SqQTvyO7shsK5v5idn3Rn6D5iuyjFoprsug/';

  const items = [
    {
      name: 'AK-47 | Redline',
      price: 180.0,
      category: 'Rifle',
      image,
    },
    {
      name: 'AWP | Dragon Lore',
      price: 1200.0,
      category: 'Sniper Rifle',
      image,
    },
    {
      name: 'M4A4 | Asiimov',
      price: 200.0,
      category: 'Rifle',
      image,
    },
    {
      name: 'Glock-18 | Fade',
      price: 250.0,
      category: 'Pistol',
      image,
    },
    {
      name: 'Desert Eagle | Blaze',
      price: 350.0,
      category: 'Pistol',
      image,
    },
    {
      name: 'USP-S | Kill Confirmed',
      price: 400.0,
      category: 'Pistol',
      image,
    },
    {
      name: 'P90 | Death by Kitty',
      price: 150.0,
      category: 'SMG',
      image,
    },
    {
      name: 'FAMAS | Pulse',
      price: 120.0,
      category: 'Rifle',
      image,
    },
    {
      name: 'M4A1-S | Hyper Beast',
      price: 300.0,
      category: 'Rifle',
      image,
    },
    {
      name: 'AK-47 | Case Hardened',
      price: 500.0,
      category: 'Rifle',
      image,
    },
  ];

  for (const item of items) {
    await prisma.item.create({ data: item });
  }
}

main()
  .then(() => {
    console.log('Itens adicionados com sucesso!');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

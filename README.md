# CSkinStore - Full Stack Application

Este é um projeto full stack que lista e filtra skins de CS:GO. O front-end foi desenvolvido com Next.js e Chakra UI, e o back-end foi construído com Nest.js, Prisma e MongoDB. A aplicação permite que os usuários busquem e filtrem skins por categoria, preço e nome.

## Índice

-   [Requisitos](#requisitos)
-   [Tecnologias](#tecnologias)
-   [Instalação](#instalação)
-   [Execução](#execução)
    -   [Front-end](#executando-o-front-end)
    -   [Back-end](#executando-o-back-end)
-   [Variáveis de Ambiente](#variáveis-de-ambiente)
-   [Estrutura do Projeto](#estrutura-do-projeto)

---

## Requisitos

Certifique-se de ter os seguintes programas instalados:

-   **Node.js** (versão 16 ou superior)
-   **npm** ou **yarn**
-   **MongoDB** (local ou na nuvem, como Atlas)

---

## Tecnologias

### Front-end:

-   **Next.js** 14
-   **React**
-   **Chakra UI**
-   **React Query** (TanStack Query)

### Back-end:

-   **Nest.js**
-   **Prisma** (ORM para o banco de dados MongoDB)
-   **MongoDB** (Banco de dados NoSQL)

---

## Instalação

### Instalar dependências do front-end

cd cskinstore-frontend

`npm install`

### Instalar dependências do back-end

cd cskinstore-backend

`npm install`

# Variáveis de Ambiente

### Front-end

`NEXT_PUBLIC_API_URL: URL da API back-end.`

### Back-end

`DATABASE_URL: String de conexão do MongoDB.`

# Endpoints

### GET: `/items`

### Response:

    [
        {
            "id": "1",
            "name": "AK-47 | Redline",
            "category": "Rifle",
            "price": 350,
            "image": "url-da-imagem",
            "createdAt": "2023-01-01T12:00:00.000Z",
            "updatedAt": "2023-08-01T12:00:00.000Z"
        },
        {
            "id": "2",
            "name": "AWP | Asiimov",
            "category": "Sniper",
            "price": 850,
            "image": "url-da-imagem",
            "createdAt": "2023-01-01T12:00:00.000Z",
            "updatedAt": "2023-08-01T12:00:00.000Z"
        }
    ]

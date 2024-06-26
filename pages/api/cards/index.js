import dbConnect from "@/db/connect.js";
import { cardToDb, dbToCard } from "@/db/utils";
import Card from "@/db/models/Card";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  const session = await getServerSession(request, response, authOptions);

  if (!session?.user?.id)
    return response.status(401).json({ status: "Not logged in" });

  if (
    request.method === "GET" &&
    request.url.includes("/api/cards") &&
    request.query.filter
  ) {
    const searchQuery = request.query.filter;

    const cards = await Card.find().or({
      $or: [
        { question: { $regex: searchQuery + ".*", $options: "i" } },
        { answer: { $regex: searchQuery + ".*", $options: "i" } },
      ],
      user: session.user.id,
    });

    return response.status(200).json(cards.map((dbCard) => dbToCard(dbCard)));
  }

  if (request.method === "GET" && request.url === "/api/cards") {
    let cards;

    if (request.query.filter) {
      const searchQuery = request.query.filter;
      cards = await Card.find({
        $or: [
          { question: { $regex: searchQuery + ".*", $options: "i" } },
          { answer: { $regex: searchQuery + ".*", $options: "i" } },
        ],
        user: session.user.id,
      });
    } else {
      cards = await Card.find({
        user: session.user.id,
      });
    }

    return response.status(200).json(cards.map((dbCard) => dbToCard(dbCard)));
  }

  if (request.method === "POST") {
    try {
      const cardData = request.body;
      cardData.user = session.user.id;

      const newCard = await Card.create(cardToDb(cardData));

      return response.status(201).json(dbToCard(newCard));
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error.message });
    }
  }
}

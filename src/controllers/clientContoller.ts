import { Request, Response } from "express"; 
import { Client } from "../models/Client";
import { v4 as uuidv4 } from "uuid"; // npm i uuid

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    console.log("Error fetching clients:", err);
    res.status(500).json({ message: "Error fetching clients" });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const client = new Client({
      ...req.body,
      code: uuidv4() 
    });
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    console.log("Error creating client:", err); 
    res.status(400).json({ message: "Error creating client" });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedClient = await Client.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedClient) return res.status(404).json({ message: "Client not found" });
    res.json(updatedClient);
  } catch (err) {
    console.log("Error updating client:", err);
    res.status(400).json({ message: "Error updating client" });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    if (!client) return res.status(404).json({ message: "Client not found" });

    await client.deleteOne(); 
    res.json({ message: "Client deleted successfully" });
  } catch (err) {
    console.log("Error deleting client:", err);
    res.status(400).json({ message: "Error deleting client" });
  }
};

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_KEY);

app.get("/posts", async (req, res) => {
  const { data, error } = await supabase.from("posts").select("*").order("id", { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post("/posts", async (req, res) => {
  const { title, content } = req.body;
  const { data, error } = await supabase.from("posts").insert([{ title, content }]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

import { Request, Response} from "express";
import path from "path";

export const pageLogin = (req: Request, res: Response) => {
  const views = path.join(__dirname, "../views");
  console.log(views);
  res.sendFile(`${views}/templates/login.html`, (err) => {
    if (err) {
      console.error("Erro ao abrir a página:", err);
      res.status(404).json({ error: "Página não encontrada" });
    } else {
      console.log("Página aberta com sucesso");
      res.status(200).end();
    }
  });
};

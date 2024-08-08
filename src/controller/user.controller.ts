import { Request, Response } from 'express';
import db from '../controller/database/prisma.connect';

class UserController {
    public async ListaAlimentos(req: Request, res: Response) {
        try {
            const products = await db.produto.findMany({
                where: { productType: 'A' }
            });
            return res.status(200).json({ success: true, data: products });
        } catch (error) {
            console.error("Falha ao recuperar produtos alimentícios:", error);
            return res.status(500).json({ success: false, msg: "Erro no banco de dados." });
        }
    }

    public async ListaProdutosMoreTen(req: Request, res: Response) {
        try {
            const products = await db.produto.findMany({
                where: { valor: { gt: 10 } }
            });
            return res.status(200).json({ success: true, data: products });
        } catch (error) {
            console.error("Falha ao recuperar produtos caros:", error);
            return res.status(500).json({ success: false, msg: "Erro no banco de dados." });
        }
    }

    public async ListaAvaliaçãoPreçoMaior(req: Request, res: Response) {
        try {
            const products = await db.produto.findMany({
                where: { disponivel: true },
                orderBy: { valor: 'desc' }
            });
            return res.status(200).json({ success: true, data: products });
        } catch (error) {
            console.error("Falha ao listar produtos disponíveis:", error);
            return res.status(500).json({ success: false, msg: "Erro no banco de dados." });
        }
    }

    public async ListaLojasCondicionais(req: Request, res: Response) {
        try {
            const stores = await db.loja.findMany({
                where: {
                    OR: [
                        { quantidadeFiliais: { gt: 1 } },
                    ]
                }
            });
            return res.status(200).json({ success: true, data: stores });
        } catch (error) {
            console.error("Falha ao recuperar lojas:", error);
            return res.status(500).json({ success: false, msg: "Erro no banco de dados." });
        }
    }

    public async ListaUsuariosMaria(req: Request, res: Response) {
        try {
            const users = await db.usuario.findMany({
                where: {
                    nome: {
                        contains: 'maria',
                        mode: 'insensitive'
                    }
                }
            });
            return res.status(200).json({ success: true, data: users });
        } catch (error) {
            console.error("Falha ao recuperar usuários:", error);
            return res.status(500).json({ success: false, msg: "Erro no banco de dados." });
        }
    }
}

export default UserController;

import { Request, Response } from 'express';
import db from '../controller/database/prisma.connect';

class ProdutoController {
    public async list(req: Request, res: Response) {
        try {
            const produto = await db.produto.findMany();
            return res
                .status(200)
                .json({ success: true, msg: "Listagem de produtos realizada com sucesso.", data: produto });
        } catch (error) {
            console.error("Erro ao listar produtos:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro ao acessar o banco de dados." });
        }
    }

    public async create(req: Request, res: Response) {
        const { description, valor, quantidadeEstoque, productType, disponivel } = req.body;
        try {
            const novoProduto = await db.produto.create({
                data: { description, valor, quantidadeEstoque, productType, disponivel },
            });
            return res
                .status(201)
                .json({ success: true, msg: "Produto criado com sucesso.", data: novoProduto });
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Falha ao criar produto devido a um erro interno do servidor." });
        }
    }

    public async show(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const produto = await db.produto.findUnique({
                where: { id: parseInt(id) },
            });
            if (produto) {
                return res
                    .status(200)
                    .json({ success: true, msg: "Detalhes do produto encontrados.", data: produto });
            } else {
                return res
                    .status(404)
                    .json({ success: false, msg: "Produto não encontrado." });
            }
        } catch (error) {
            console.error("Erro ao encontrar produto:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Falha ao encontrar produto devido a um erro interno do servidor." });
        }
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const updates = req.body;
        try {
            const AtualizarProduto = await db.produto.update({
                where: { id: parseInt(id) },
                data: updates,
            });
            return res
                .status(200)
                .json({ success: true, msg: "Produto atualizado com sucesso.", data: AtualizarProduto });
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Falha ao atualizar produto devido a um erro interno do servidor." });
        }
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await db.produto.delete({
                where: { id: parseInt(id) },
            });
            return res
                .status(204)
                .json({ success: true, msg: "Produto deletado com sucesso." });
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Falha ao deletar produto devido a um erro interno do servidor." });
        }
    }
}

export default ProdutoController;

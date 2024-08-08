import { Request, Response } from 'express';
import db from '../controller/database/prisma.connect';  // Atualize o caminho conforme necessário

class LojaController {
    public async list(req: Request, res: Response) {
        try {
            const stores = await db.loja.findMany();
            return res.status(200).json({ success: true, msg: "Listagem de lojas realizada com sucesso.", data: stores });
        } catch (error) {
            console.error("Erro ao listar lojas:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro ao acessar o banco de dados." });
        }
    }

    public async create(req: Request, res: Response) {
        const { cnpj, nome, segmento, endereco, telefone, quantidadeFiliais, dataHoraAbertura } = req.body;
        try {
            const store = await db.loja.create({
                data: { cnpj, nome, segmento, endereco, telefone, quantidadeFiliais, dataHoraAbertura },
            });
            return res.status(201).json({ success: true, msg: "Loja criada com sucesso.", data: store });
        } catch (error) {
            console.error("Erro ao criar loja:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Falha ao criar loja devido a um erro interno do servidor." });
        }
    }

    public async show(req: Request, res: Response) {
        const { cnpj } = req.params;
        try {
            const store = await db.loja.findUnique({
                where: { cnpj },
            });
            if (store) {
                return res
                    .status(200)
                    .json({ success: true, msg: "Detalhes da loja encontrados.", data: store });
            } else {
                return res
                    .status(404)
                    .json({ success: false, msg: "Loja não encontrada." });
            }
        } catch (error) {
            console.error("Erro ao encontrar loja:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Falha ao encontrar loja devido a um erro interno do servidor." });
        }
    }

    public async update(req: Request, res: Response) {
        const { cnpj } = req.params;
        const updates = req.body;
        try {
            const store = await db.loja.update({
                where: { cnpj },
                data: updates,
            });
            return res.status(200).json({ success: true, msg: "Loja atualizada com sucesso.", data: store });
        } catch (error) {
            console.error("Erro ao atualizar loja:", error);
            return res
                .status(404)
                .json({ success: false, msg: "Loja não encontrada." });
        }
        return res
            .status(500)
            .json({ success: false, msg: "Falha ao atualizar loja devido a um erro interno do servidor." });
    }
    public async delete(req: Request, res: Response) {
        const { cnpj } = req.params;
        try {
            await db.loja.delete({
                where: { cnpj },
            });
            return res.status(204).json({ success: true, msg: "Loja deletada com sucesso." });
        } catch (error) {
            console.error("Erro ao deletar loja:", error);

            return res
                .status(404)
                .json({ success: false, msg: "Loja não encontrada." });

            return res
                .status(500)
                .json({ success: false, msg: "Falha ao deletar loja devido a um erro interno do servidor." });
        }
    }
}



export default LojaController;

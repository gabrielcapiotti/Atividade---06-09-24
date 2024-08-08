import { Request, Response } from 'express';
import db from '../controller/database/prisma.connect';

class RecursosController {
    public async list(req: Request, res: Response) {
        try {
            const Recursoss = await db.fornecedor.findMany();
            return res
                .status(200)
                .json({ success: true, msg: "Listagem de fornecedores realizada com sucesso.", data: Recursoss });
        } catch (error) {
            console.error("Erro ao listar fornecedores:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Erro ao acessar o banco de dados." });
        }
    }


    public async create(req: Request, res: Response) {
        const { nome, email, avaliacao } = req.body;
        try {
            const newRecursos = await db.fornecedor.create({
                data: { nome, email, avaliacao },
            });
            return res
                .status(201)
                .json({ success: true, msg: "Fornecedor criado com sucesso.", data: newRecursos });
        } catch (error) {
            console.error("Erro ao criar fornecedor:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Falha ao criar fornecedor devido a um erro interno do servidor." });
        }
    }

    public async show(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const Recursos = await db.fornecedor.findUnique({
                where: { id: parseInt(id) },
            });
            if (Recursos) {
                return res
                    .status(200)
                    .json({ success: true, msg: "Detalhes do fornecedor encontrados.", data: Recursos });
            } else {
                return res
                    .status(404)
                    .json({ success: false, msg: "Fornecedor não encontrado." });
            }
        } catch (error) {
            console.error("Erro ao encontrar fornecedor:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Falha ao encontrar fornecedor devido a um erro interno do servidor." });
        }
    }


    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const updates = req.body;
        try {
            const updatedRecursos = await db.fornecedor.update({
                where: { id: parseInt(id) },
                data: updates,
            });
            return res
                .status(200)
                .json({ success: true, msg: "Fornecedor atualizado com sucesso.", data: updatedRecursos });
        } catch (error) {
            console.error("Erro ao atualizar fornecedor:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Falha ao atualizar fornecedor devido a um erro interno do servidor." });
        }
    }


    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await db.fornecedor.delete({
                where: { id: parseInt(id) },
            });
            return res
                .status(204)
                .json({ success: true, msg: "Fornecedor deletado com sucesso." });
        } catch (error) {
            console.error("Erro ao deletar fornecedor:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Falha ao deletar fornecedor devido a um erro interno do servidor." });
        }
    }
}

export default RecursosController;

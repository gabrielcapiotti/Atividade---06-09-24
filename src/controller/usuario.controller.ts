import { Request, Response } from "express";
import db from "../controller/database/prisma.connect";

class UsuarioController {
    public async list(req: Request, res: Response) {
        try {
            const users = await db.usuario.findMany();
            return res.status(200).json({ success: true, msg: "Usuários listados com sucesso", data: users });
        } catch (error) {
            console.error("Erro ao listar usuários:", error);

            return res
                .status(500)
                .json({ success: false, msg: "Falha ao listar usuários devido a um erro no banco de dados." });
        }
    }

    public async show(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await db.usuario.findUnique({
                where: { id: parseInt(id) },
            });
            if (user) {
                return res
                    .status(200)
                    .json({ success: true, msg: "Usuário encontrado", data: user });

            } else {
                return res
                    .status(404)
                    .json({ success: false, msg: "Usuário não encontrado" });
            }
        } catch (error) {
            console.error("Erro ao encontrar usuário:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Falha ao encontrar o usuário devido a um erro interno do servidor" });
        }
    }

    public async create(req: Request, res: Response) {
        const { nome, idade, email, password, linkGithub } = req.body;
        try {
            const user = await db.usuario.create({
                data: { nome, idade, email, password, linkGithub },
            });
            return res
                .status(201)
                .json({ success: true, msg: "Usuário criado com sucesso", data: user });


        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Falha ao criar o usuário devido a um erro interno do servidor" });
        }
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const updates = req.body;
        try {
            const user = await db.usuario.update({
                where: { id: parseInt(id) },
                data: updates,
            });
            return res.status(200).json({ success: true, msg: "Usuário atualizado com sucesso", data: user });
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            return res
                .status(500)
                .json({ success: false, msg: "Falha ao atualizar o usuário devido a um erro interno do servidor" });
        }
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await db.usuario.delete({
                where: { id: parseInt(id) },
            });
            return res.status(204).json({ success: true, msg: "Usuário deletado com sucesso" });
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            return res
                .status(404)
                .json({ success: false, msg: "Usuário não encontrado" });

            return res
                .status(500)
                .json({ success: false, msg: "Falha ao deletar o usuário devido a um erro interno do servidor" });
        }
    }
}

export { UsuarioController };

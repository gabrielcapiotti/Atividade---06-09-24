import { Request, Response } from "express";
import db from "../controller/database/prisma.connect"

class Controller {
    // Método de listagem do tipo de produto
    public async listProductsByType(req: Request, res: Response) {
        try {
            const products = await db.produto.findMany({
                where: {
                    productType: 'A'
                }
            });
            return res.status(200).json({ success: true, msg: "Products of type 'A' listed successfully!", data: products });
        } catch (error) {
            console.error("Error listing products by type:", error);
            return res.status(500).json({ success: false, msg: "Failed to list products by type." });
        }
    }

    // Método de listagem de produtos acima de R$ 10,00
    public async listExpensiveProducts(req: Request, res: Response) {
        try {
            const products = await db.produto.findMany({
                where: {
                    valor: {
                        gt: 10
                    }
                }
            });
            return res.status(200).json({ success: true, msg: "Expensive products listed successfully!", data: products });
        } catch (error) {
            console.error("Error listing expensive products:", error);
            return res.status(500).json({ success: false, msg: "Failed to list expensive products." });
        }
    }

    // Listagem d lojas com mais de 1 filial ou sem gerente
    public async listStoresWithConditions(req: Request, res: Response) {
        try {
            const stores = await db.loja.findMany({
                where: {
                    OR: [
                        { quantidadeFiliais: { gt: 1 } },
                    ]
                }
            });
            return res.status(200).json({ success: true, msg: "Stores with conditions listed successfully!", data: stores });
        } catch (error) {
            console.error("Error listing stores with conditions:", error);
            return res.status(500).json({ success: false, msg: "Failed to list stores with conditions." });
        }
    }

    // Encontrar usuários com palavra "maria" no nome (case insensitive)
    public async findUsersNameMaria(req: Request, res: Response) {
        try {
            const users = await db.usuario.findMany({
                where: {
                    nome: {
                        contains: 'maria',
                        mode: 'insensitive'
                    }
                }
            });
            return res.status(200).json({ success: true, msg: "Users with 'maria' in their names found successfully!", data: users });
        } catch (error) {
            console.error("Error finding users with 'maria' in name:", error);
            return res.status(500).json({ success: false, msg: "Failed to find users with 'maria' in name." });
        }
    }

    // Listagem de produtos disponíveis por valor (maior ao menor)
    public async listAvailableProducts(req: Request, res: Response) {
        try {
            const products = await db.produto.findMany({
                where: {
                    disponivel: true
                },
                orderBy: {
                    valor: 'desc'
                }
            });
            return res.status(200).json({ success: true, msg: "Available products ordered by price listed successfully!", data: products });
        } catch (error) {
            console.error("Error listing available products by price:", error);
            return res.status(500).json({ success: false, msg: "Failed to list available products by price." });
        }
    }
}

export default Controller;


export class ProductCreation {
    // Criar novo produto no banco de dados
    public async createProduct(req: Request, res: Response) {
        try {
            const { description, valor, productType } = req.body;

            if (!description || !valor || !productType) {
                return res.status(400).json({
                    success: false,
                    msg: "Description, price, and product type are required."
                });
            }

            // Criar produto utilizando Prisma Client
            const newProduct = await db.produto.create({
                data: {
                    description,
                    valor,
                    productType,
                    disponivel
                }
            });

            // Resposta bem-sucedida com o produto criado
            return res.status(200).json({
                success: true,
                msg: "Product successfully created!",
                product: newProduct
            });
        } catch (error) {
            // Log de erro e resposta de falha
            console.error("Error creating product:", error);
            return res.status(500).json({
                success: false,
                msg: "Failed to create product."
            });
        }
    }
}


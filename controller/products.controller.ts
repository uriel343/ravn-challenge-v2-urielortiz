import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, img, category } = req.body;
    let product: Prisma.productsCreateInput;
    if (!name || !description || !price || !stock || !img || !category) {
      res.status(400).send({ msg: "Incomplete params" });
    }
    product = {
      name: name,
      description: description,
      price: price,
      stock: stock,
      img: img,
      enabled: true,
      categoryId: category,
    };
    const createdProduct = await prisma.products.create({ data: product });
    if (!createdProduct) {
      res.status(400).send({ msg: "Something was wrong please try again" });
    }
    res.status(200).send({ msg: "success", createdProduct });
  } catch (error) {
    res.status(500).send({ msg: "Error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, stock, price, enabled, img } = req.body;
    const { id } = req.params;

    const updateProduct = await prisma.products.update({
        where: {
            id : id
        },
        data : {
            name: name,
            description: description, 
            stock: stock,
            price: price,
            img: img,
            enabled : enabled
        }
    })

    if(!updateProduct) {
        res.status(400).send({msg: 'Something was wrong please try again'})
    }
    res.status(200).send({ msg: 'success', updateProduct })
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

export const deleteProduct = async(req: Request, res: Response) => {    
    try {
       const { id } = req.params;
       if(!id) {
        res.status(400).send({ msg: 'Incomplete params' })
       } 
       const deletedProduct = await prisma.products.delete({
        where: {
            id: id
        }
       })
       res.status(200).send({  msg: 'Success, product deleted', deletedProduct })
    } catch (error) {
        res.status(500).send({ msg: 'Success! Product Deleted' })
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const allProducts = await prisma.products.findMany({
            where: {
                enabled: true
            }
        })
        if(!allProducts) {
            res.status(404).send({ msg: "There aren't products to show" })
        }
        res.status(200).send({ allProducts })
    } catch (error) {
        res.status(500).send({ msg: 'Internal server error' })
    }
}
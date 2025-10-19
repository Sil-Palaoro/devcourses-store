import { Request, Response } from "express";
import { getCartList, 
    createCart,
    getCart, 
    getCartByUserId, 
    updateCart,
    deleteCart,
    addItemToCart,
    removeItemFromCart
  } from "@devcourses/domain";
import { prismaCartServiceImplementation } from "../services/prisma-cart-service-implementation";


export class CartController {
    static async getAllCarts(req: Request, res: Response) {
        try {
            const result = await getCartList({ dependencies: { cartService: prismaCartServiceImplementation } });
            
            if (result instanceof Error) {
                return res.status(404).json({ message: result.message});

            }

            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message});
        }
    }


    static async getCartById(req: Request, res: Response) {
        try {
          const id = req.params.id!;
          const cart = await getCart({ 
            dependencies: { cartService: prismaCartServiceImplementation }, 
            payload: {id: id} 
            });

          if (cart instanceof Error) {
            return res.status(404).json({ message: cart.message });
          }
          res.status(200).json(cart);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
    }


    static async getCartByUserId(req: Request, res: Response) {
        try {
          const userId = req.params.id!;

          if (!userId || typeof userId !== "string") {
            return res.status(400).json({ message: "Se requiere el userId" });
          } 

          const cart = await getCartByUserId({ 
            dependencies: { cartService: prismaCartServiceImplementation }, 
            payload: {userId: userId} 
            });

          if (cart instanceof Error) {
            return res.status(404).json({ message: cart.message });
          }
          res.status(200).json(cart);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
    }


    static async createCart(req: Request, res: Response) {
        try {
            const cart = req.body;
            await createCart({ 
                dependencies: { cartService: prismaCartServiceImplementation }, 
                payload: {cart: cart} });
            
            return res.status(201).json({ message: "Cart created successfully"});

        } catch (error: any) {
            res.status(500).json({ message: error.message});
        }
    }


  static async updateCart(req: Request, res: Response) {
        try {
          const id = req.params.id!;
          const data = req.body;

          const updatedCart = await updateCart({ 
            dependencies: { cartService: prismaCartServiceImplementation }, 
            payload: {
              id: id, 
              data: data} 
            });

          if (updatedCart instanceof Error) {
            return res.status(404).json({ message: updatedCart.message });
          }
          res.status(200).json(updatedCart);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
    }


    static async deleteCart(req: Request, res: Response) {
      try {
        const id = req.params.id!;
        await deleteCart({ 
          dependencies: { cartService: prismaCartServiceImplementation }, 
          payload: {id: id} 
          });
        res.status(200).json({ message: "Cart deleted successfully"});
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }


  static async addItemToCart(req: Request, res: Response) {
        try {
          const {userId, courseId, quantity, priceSnapshot} = req.body;

          const updatedCart = await addItemToCart({ 
            dependencies: { cartService: prismaCartServiceImplementation }, 
            payload: {
              userId: userId, 
              courseId: courseId, 
              quantity: quantity, 
              priceSnapshot: priceSnapshot
            } 
            });

          if (updatedCart instanceof Error) {
            return res.status(404).json({ message: updatedCart.message });
          }
          res.status(200).json(updatedCart);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
    }    


  static async removeItemFromCart(req: Request, res: Response) {
        try {
          const {userId, cartItemId} = req.body;

          const updatedCart = await removeItemFromCart({ 
            dependencies: { cartService: prismaCartServiceImplementation }, 
            payload: {
              userId: userId, 
              cartItemId: cartItemId, 
            } 
            });

          if (updatedCart instanceof Error) {
            return res.status(404).json({ message: updatedCart.message });
          }
          res.status(200).json(updatedCart);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
    }  
}


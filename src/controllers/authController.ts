import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

// Registro de usuário
export const register = async (req: Request, res: Response) => {
  const { name, email, password, googleId } = req.body;
  
  try {
    const user = await authService.registerUser(name, email, password, googleId);
    res.status(201).json(user);
  } catch (err: any) {
    if (err.message === 'Nome inválido' || err.message === 'Email inválido' || err.message === 'Senha inválida') {
      // Status 400 para erros de validação
      res.status(400).json({ error: err.message });
    } else if (err.message === 'Email já está em uso.') {
      // Status 409 para conflito de recurso
      res.status(409).json({ error: err.message });
    } else {
      // Status 500 para erros inesperados
      res.status(500).json({ error: 'Erro no servidor.' });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password} = req.body;

  try {
    const user = await authService.loginUser(email, password);
    res.status(200).json({ message: 'Login bem-sucedido', user });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

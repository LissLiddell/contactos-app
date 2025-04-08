import { Request, Response } from 'express';
import { AppDataSource } from '../utils/data-source';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userRepo = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const existing = await userRepo.findOneBy({ email });
    if (existing) {
      res.status(400).json({ message: 'El correo ya está registrado' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepo.create({ name, email, password: hashedPassword });
    await userRepo.save(user);

    res.status(201).json({ message: 'Usuario creado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar', error: err });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await userRepo.findOneBy({ email });
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(401).json({ message: 'Contraseña incorrecta' });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '2h' });

    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: err });
  }
};
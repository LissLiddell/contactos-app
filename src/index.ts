import 'reflect-metadata';
import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { AppDataSource } from '../src/utils/data-source';
import authRoutes from '../src/routes/auth.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

app.get('/', (_req: Request, res: Response) => {
    res.send('API funcionando 😎');
  });

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Conectado a la base de datos');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error('❌ Error al conectar con la base de datos', err);
  });
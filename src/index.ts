import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './utils/data-source';
import authRoutes from './routes/auth.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

app.get('/', (_req, res) => res.send('API de Contactos funcionando'));

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Conectado a la base de datos');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error al conectar con la base de datos', err);
  });
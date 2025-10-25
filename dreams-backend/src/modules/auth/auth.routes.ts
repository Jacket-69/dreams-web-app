import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validate } from '@/middlewares/validate.middleware'; // Importar middleware de validación 
import { loginSchema } from './dto/login.dto';
import { recoverySchema } from './dto/recovery.dto';
import { resetPasswordSchema } from './dto/reset-password.dto';
import { authenticate } from '@/middlewares/auth.middleware'; // Importar middleware de autenticación

const router = Router();
const authController = new AuthController();

// POST /api/v1/auth/login
router.post('/login', validate(loginSchema), authController.login);

// POST /api/v1/auth/recovery
router.post('/recovery', validate(recoverySchema), authController.handleRecovery);

// POST /api/v1/auth/reset-password
router.post('/reset-password', validate(resetPasswordSchema), authController.handleResetPassword);

// GET /api/v1/auth/profile
router.get('/profile', authenticate, authController.getProfile);

// POST /api/v1/auth/logout (ruta simbólica)
router.post('/logout', authenticate, authController.logout);

export default router;
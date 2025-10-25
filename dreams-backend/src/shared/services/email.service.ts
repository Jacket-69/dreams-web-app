import nodemailer from 'nodemailer';

// Configuración del transporter de Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT || '587'),
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * Envía un email de recuperación de contraseña
 * @param to - Email del destinatario
 * @param token - Token de reseteo de contraseña
 */
export async function sendPasswordResetEmail(to: string, token: string): Promise<void> {
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: to,
    subject: 'Recuperación de Contraseña - Dreams App',
    text: `Hola,\n\nHas solicitado recuperar tu contraseña. Haz clic en el siguiente enlace para restablecerla:\n\nhttp://localhost:3001/change-password?token=${token}\n\nEste enlace expirará en 1 hora.\n\nSi no solicitaste este cambio, ignora este email.\n\nSaludos,\nEquipo Dreams App`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Recuperación de Contraseña</h2>
        <p>Hola,</p>
        <p>Has solicitado recuperar tu contraseña. Haz clic en el siguiente botón para restablecerla:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="http://localhost:3001/change-password?token=${token}" 
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Restablecer Contraseña
          </a>
        </div>
        <p><strong>Este enlace expirará en 1 hora.</strong></p>
        <p>Si no solicitaste este cambio, ignora este email.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 14px;">Saludos,<br>Equipo Dreams App</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email de recuperación enviado a: ${to}`);
  } catch (error) {
    console.error('Error enviando email de recuperación:', error);
    throw new Error('No se pudo enviar el email de recuperación');
  }
}

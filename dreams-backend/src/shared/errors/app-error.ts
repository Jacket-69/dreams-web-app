// Clase base para errores personalizados de la aplicación
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Capturar stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error 400 - Bad Request
export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

// Error 401 - Unauthorized
export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

// Error 403 - Forbidden
export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 403);
  }
}

// Error 404 - Not Found
export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

// Error 409 - Conflict
export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}

// Error 422 - Validation Error
export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 422);
  }
}

// Error 500 - Internal Server Error
export class InternalServerError extends AppError {
  constructor(message: string) {
    super(message, 500);
  }
}

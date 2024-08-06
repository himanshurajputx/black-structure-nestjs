import { HttpStatus } from '@nestjs/common';

export class RequestHandler {
  throwError(status, errorType, errorMessage) {
    return (e) => {
      if (!e) e = new Error(errorMessage || 'Default Error');
      e.status = status;
      e.errorType = errorType;
      throw e;
    };
  }

  catchError(res, error) {
    if (!error) error = new Error('Default error');
    res.status(error.status || 500).json({
      type: 'error',
      message: error.message || 'Unhandled error',
      error,
    });
  }

  success(req?: any, res?: any, message?: any, data?: any) {
    return res.status(HttpStatus.OK).json({
      requestId: req?.id,
      timestamp: new Date().toLocaleString(),
      success: true,
      method: req.method,
      statusCode: HttpStatus.OK,
      message: message,
      data: data,
    });
  }

  error(req?: any, res?: any, e?: any) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      requestId: req?.id,
      timestamp: new Date().toLocaleString(),
      success: false,
      method: req.method,
      statusCode: HttpStatus.BAD_REQUEST,
      message:
        e.writeErrors !== undefined
          ? e.message
          : e instanceof TypeError
            ? e.message
            : e,
    });
  }
}

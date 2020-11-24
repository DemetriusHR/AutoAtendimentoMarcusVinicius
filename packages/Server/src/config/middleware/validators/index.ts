import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

function middlewareValidator(
  schema: object
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction): void => {
    const error: Joi.ValidationError = Joi.validate(req.body, schema).error;

    if (error === null) {
      next();
    } else {
      const details: Joi.ValidationErrorItem[] = error.details;
      const message: string = details
        .map((validate) => validate.message)
        .join(',');

      console.log('error', message);
      res.status(422).json({ error: message });
    }
  };
}

export default middlewareValidator;

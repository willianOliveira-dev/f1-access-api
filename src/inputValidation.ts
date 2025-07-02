import Joi from "joi";
import { Request } from "express";

interface FunctionPositionSchema {
    (position: string, maxValue: number): Joi.ValidationResult;
}

// closure
function validation<T>(
    schema: Joi.Schema
): (req: Request<T>) => Joi.ValidationResult {
    return function validateInfo(req: Request<T>) {
        return schema.validate(req, { abortEarly: false });
    };
}

const driverSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    team: Joi.string().min(3).max(50).required(),
    points: Joi.number().integer().min(0).max(1000).default(0),
});

const updateDriverSchema = Joi.object({
    name: Joi.string().min(3).max(50),
    team: Joi.string().min(3).max(50),
    points: Joi.number().integer().min(0).max(1000),
}).min(1);

const generatePositionSchema = (maxValue: number) =>
    Joi.number().integer().min(1).max(maxValue).required();
export const validateDriverInfo = validation(driverSchema);
export const validateUpdateDriverInfo = validation(updateDriverSchema);
export const validatePosition: FunctionPositionSchema = (position, maxValue) =>
    generatePositionSchema(maxValue).validate(position, { convert: true });

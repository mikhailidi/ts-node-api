import { Response, Request, NextFunction, Router, RequestHandler } from 'express';
import { createValidator, ExpressJoiInstance, ValidatedRequest } from 'express-joi-validation';
import { IService } from '../interfaces/Service';

export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
};

interface IRoute {
    path: string;
    method: Methods;
    handler: (req: Request | ValidatedRequest<any>, res: Response, next: NextFunction) => void | Promise<void>;
    handlerMiddleware?: RequestHandler[];
};

export default abstract class Controller {
    public router: Router = Router();
    public abstract path: string;
    protected abstract readonly routes: Array<IRoute> = [];
    protected validator: ExpressJoiInstance;

    constructor(protected service: IService) {
        this.validator = createValidator({
            passError: true
        });
    }

    public setRoutes = (): Router => {
        for (const route of this.routes) {
            switch (route.method) {
                case 'GET':
                    this.router.get(
                        route.path,
                        route.handlerMiddleware ?? [],
                        route.handler);
                    break;
                case 'POST':
                    this.router.post(
                        route.path,
                        route.handlerMiddleware ?? [],
                        route.handler
                    );
                    break;
                case 'PUT':
                    this.router.put(
                        route.path,
                        route.handlerMiddleware ?? [],
                        route.handler
                    );
                    break;
                case 'DELETE':
                    this.router.delete(
                        route.path,
                        route.handlerMiddleware ?? [],
                        route.handler
                    );
                    break;
                default:
                    console.log('Not a valid method')
                    break;
            };
        };
        
        return this.router;
    }

    /**
     * 
     * @param res 
     * @param data 
     */
    protected sendSuccess(res: Response, data: object): Response {
        return res.status(200).json(
            data
        );
    };

    /**
     * 
     * @param res 
     * @param message 
     */
    protected sendNotFound(res: Response, message?: string): Response {
        return res.status(404).json({
            code: 404, // Should be Enum
            message: message || 'Resource not found',
        });
    };

    /**
     * 
     * @param res 
     * @param message 
     */
    protected sendError(res: Response, message?: string): Response {
        return res.status(500).json({
            message: message || 'Internal server error',
        });
    };
};

import { Controller, Get, Query } from "@nestjs/common";
import { GetHistory } from "src/domain/usecases/history/get-history";
import { HistoryPresenter } from "../../presenters/history.presenter";
import { ZodValidationPipe } from "../../pipes/zod-validation.pipe";
import { z } from "zod";
import { OrderBy } from "src/core/order-by";

const requestSchema =  z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
    text: z.string().optional(),
    order_by: z.nativeEnum(OrderBy).optional(),
});

type RequestSchema = z.infer<typeof requestSchema>;

const validationPipe = new ZodValidationPipe(requestSchema);

@Controller("/history")
export class GetHistoryController {
    constructor(private readonly getHistory: GetHistory) {}

    @Get()
    async handle(@Query(validationPipe) query: RequestSchema) {
        const { page, limit, order_by, text } = query
        
        const res = await this.getHistory.execute({
            pagination: {
                page,
                limit
            },
            filters: {
                text: text ?? undefined,
                orderBy: order_by ?? undefined
            }
        })

        return {
            history: res.history.map(HistoryPresenter.toHttp),
            meta: res.paginationsReponse
        }
    }
}
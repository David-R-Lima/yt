import { Controller, Get, Query } from "@nestjs/common";
import { GetHistory } from "src/domain/usecases/history/get-history";
import { HistoryPresenter } from "../../presenters/history.presenter";
import { ZodValidationPipe } from "../../pipes/zod-validation.pipe";
import { z } from "zod";

const requestSchema =  z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
});

type RequestSchema = z.infer<typeof requestSchema>;

const validationPipe = new ZodValidationPipe(requestSchema);

@Controller("/history")
export class GetHistoryController {
    constructor(private readonly getHistory: GetHistory) {}

    @Get()
    async handle(@Query(validationPipe) query: RequestSchema) {
        const { page, limit } = query
        
        const res = await this.getHistory.execute({ page, limit })

        return {
            history: res.history.map(HistoryPresenter.toHttp),
            meta: res.paginationsReponse
        }
    }
}
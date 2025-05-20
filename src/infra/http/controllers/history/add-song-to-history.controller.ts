import { BadRequestException, Controller, Delete, Param, Post } from "@nestjs/common";
import { ClearHistory } from "src/domain/usecases/history/clear-history";
import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation.pipe";
import { AddSongToHistory } from "src/domain/usecases/history/add-song";
import { HistoryPresenter } from "../../presenters/history.presenter";

const requestSchema =  z.object({
    id: z.string()
});

type RequestSchema = z.infer<typeof requestSchema>;

const zodValidationPipe = new ZodValidationPipe(requestSchema);

@Controller("/history/:id")
export class AddSongToHistoryController {
    constructor(private readonly addSongToHistory: AddSongToHistory) {}

    @Post()
    async handle(@Param(zodValidationPipe) param: RequestSchema) {

        const { id } = param
        
        const res = await this.addSongToHistory.execute(id)

        if(!res) {
            throw new BadRequestException()
        }

        return HistoryPresenter.toHttp(res)
    }
}
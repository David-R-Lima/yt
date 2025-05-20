import { Controller, Delete } from "@nestjs/common";
import { ClearHistory } from "src/domain/usecases/history/clear-history";

@Controller("/history")
export class ClearHistoryController {
    constructor(private readonly clearHistory: ClearHistory) {}

    @Delete()
    async handle() {
        const res = await this.clearHistory.execute()

        return res
    }
}
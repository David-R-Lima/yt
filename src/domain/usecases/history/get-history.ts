import { Injectable } from "@nestjs/common";
import { IPaginationResponse } from "src/core/pagination";
import { History } from "src/domain/entities/history";
import { IHistoryRepository } from "src/domain/repositories/i-history-repository";

interface request {
    page?: number;
    limit?: number;
}

@Injectable()
export class GetHistory {
    constructor(private readonly iHistoryRepository: IHistoryRepository) {}

    async execute({page, limit}: request): Promise<{
            history: History[],
            paginationsReponse: IPaginationResponse
        }> {

        const res = await this.iHistoryRepository.getAll({
            limit,
            page
        })

        return {
            history: res.history,
            paginationsReponse: res.paginationsReponse
        }
    }
}
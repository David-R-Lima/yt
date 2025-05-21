import { Injectable } from "@nestjs/common";
import { IPagination, IPaginationResponse } from "src/core/pagination";
import { History } from "src/domain/entities/history";
import { GetAllHistoryFilters, IHistoryRepository } from "src/domain/repositories/i-history-repository";

interface request {
    pagination: IPagination
    filters?: GetAllHistoryFilters
}

@Injectable()
export class GetHistory {
    constructor(private readonly iHistoryRepository: IHistoryRepository) {}

    async execute({ pagination, filters}: request): Promise<{
            history: History[],
            paginationsReponse: IPaginationResponse
        }> {

        const res = await this.iHistoryRepository.getAll(pagination, filters)

        return {
            history: res.history,
            paginationsReponse: res.paginationsReponse
        }
    }
}
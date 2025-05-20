import { Injectable } from "@nestjs/common";
import { IHistoryRepository } from "src/domain/repositories/i-history-repository";

@Injectable()
export class ClearHistory {
    constructor(private readonly iHistoryRepository: IHistoryRepository) {}

    async execute() {
        await this.iHistoryRepository.delete()

        return true
    }
}